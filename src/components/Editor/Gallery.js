import React, { useRef, useState, useEffect } from "react";
import Konva from "konva";
import Draggable from "react-draggable";
import { Stage, Layer } from "react-konva";
import { CirclePicker } from "react-color";
import ColorPickerPalette from "components/ColorPickerPalette";
import { DropImage } from "components/DropImage";
import { v1 as uuidv1 } from "uuid";
import KeyboardEventHandler from "react-keyboard-event-handler";
import {
  Retangulo,
  Triangulo,
  Texto,
  Circulo,
  Imagem,
  Background,
} from "components/Formas";
import "./Editor.css";

// imagens
import Bold from "assets/icons-editor-bar/bold.png";
import Italic from "assets/icons-editor-bar/italics.png";
import Circle from "assets/icons-editor-bar/circle.png";
import Rectangle from "assets/icons-editor-bar/rectangle.png";
import FillColor from "assets/icons-editor-bar/fill-color.png";
import InsertText from "assets/icons-editor-bar/insert-text.png";
import Image from "assets/icons-editor-bar/image.png";
import Duplicate from "assets/icons-editor-bar/duplicate.png";
import Triangule from "assets/icons-editor-bar/triangule.png";
import Front from "assets/icons-editor-bar/front.png";
import Desfazer from "assets/icons-editor-bar/desfazer.png";
import Refazer from "assets/icons-editor-bar/refazer.png";
import Save from "assets/icons-editor-bar/save.png";
import Back from "assets/icons-editor-bar/back.png";
import Underline from "assets/icons-editor-bar/underline.png";
import ZoomIn from "assets/icons-editor-bar/zoom-in.png";
import ZoomOut from "assets/icons-editor-bar/zoom-out.png";
import BackgroundIcon from "assets/icons-editor-bar/background.png";

const HISTORY = [];

let POSITION = 0;

const saveHistory = (history) => {
  const remove = HISTORY.length - 1 - POSITION;
  HISTORY = HISTORY.slice(0, HISTORY.length - remove);
  HISTORY.push(history.slice(0));
  POSITION = HISTORY.length - 1;
};

const revertHistory = () => {
  return HISTORY[POSITION];
};

const Btn = (props) => {
  return (
    <div className="proximo-btn" onClick={props.onClick}>
      {props.title}
    </div>
  );
};

const Gallery = () => {
  const stageRef = useRef();
  const containerCanvas = useRef();
  const [arrayObjectsLayer, setArrayObjectsLayer] = useState([]);
  const [kanvasWidth, setKanvasWidth] = useState(9.9);
  const [kanvasHeight, setKanvasHeight] = useState(5);
  const [widthKanvas, setWidthKanvas] = useState(1200);
  const [heightKanvas, setHeightKanvas] = useState(1150);
  const [showPallet, setShowPallet] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});
  const [showBackground, setShowBackground] = useState(false);
  const [backgroundOn, setBackgroundOn] = useState(true);
  const [indexTextSelected, setIndexTextSelected] = useState(0);
  const [zoom, setZoom] = useState(2);
  const [imgBase64, setImgBase64] = useState(undefined);
  const [newTextObj, setNewTextObj] = useState({
    textEditVisible: false,
    fill: "black",
    textX: 0,
    textY: 0,
    textYTextArea: 0,
    textXTextArea: 0,
    fontName: "Arial",
    fontSize: 18,
    textAreaWidth: 200,
    textAreaHeight: 100,
    scaleX: 1,
    scaleY: 1,
  });

  const handleUndo = () => {
    if (POSITION > 0) {
      POSITION--;
      setArrayObjectsLayer(revertHistory());
    }
  };

  const handleRedo = () => {
    if (POSITION < HISTORY.length - 1) {
      POSITION++;
      setArrayObjectsLayer(revertHistory());
    }
  };

  const handleZoomIn = () => {
    setZoom(zoom + 0.2);
  };

  const handleZoomOut = () => {
    if (zoom > 0.2) {
      setZoom(zoom - 0.2);
    }
  };

  const handleSave = () => {
    const dataURL = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
  };

  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.05,
      scaleY: 1.05,
    });
  };

  const handleDragEnd = (e, index) => {
    const objects = arrayObjectsLayer.slice();
    objects[index].x = e.target.x();
    objects[index].y = e.target.y();
    objects[index].shadowOffsetX = 5;
    objects[index].shadowOffsetY = 5;
    objects[index].scaleX = 1;
    objects[index].scaleY = 1;
    setArrayObjectsLayer(objects);
    saveHistory(objects);
  };

  const handleDragTextStart = (e, index) => {
    setIndexTextSelected(index);
  };

  const handleDragTextEnd = (e) => {
    const objects = arrayObjectsLayer.slice();
    objects[indexTextSelected].x = e.target.x();
    objects[indexTextSelected].y = e.target.y();
    setArrayObjectsLayer(objects);
    saveHistory(objects);
  };

  const handleDragMove = (e, index) => {
    const objects = arrayObjectsLayer.slice();
    objects[index].x = e.target.x();
    objects[index].y = e.target.y();
    setArrayObjectsLayer(objects);
  };

  const handleTransform = (e, index) => {
    const objects = arrayObjectsLayer.slice();
    objects[index].x = e.target.x();
    objects[index].y = e.target.y();
    objects[index].width = e.target.width() * e.target.scaleX();
    objects[index].height = e.target.height() * e.target.scaleY();
    objects[index].rotation = e.target.rotation();
    objects[index].scaleX = 1;
    objects[index].scaleY = 1;
    setArrayObjectsLayer(objects);
    saveHistory(objects);
  };

  const handleDeleteObject = (index) => {
    const objects = arrayObjectsLayer.slice();
    objects.splice(index, 1);
    setArrayObjectsLayer(objects);
    saveHistory(objects);
  };

  const handleTextChange = (e, index) => {
    const objects = arrayObjectsLayer.slice();
    objects[index].text = e.target.value;
    setArrayObjectsLayer(objects);
  };

  const handleTextEdit = (index) => {
    const objects = arrayObjectsLayer.slice();
    objects[index].textEditVisible = !objects[index].textEditVisible;
    setArrayObjectsLayer(objects);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handleSave}>Save</button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={zoom}
        scaleY={zoom}
      >
        <Layer>
          {arrayObjectsLayer.map((obj, index) => {
            if (obj.type === "rectangle") {
              return (
                <Rect
                  key={index}
                  x={obj.x}
                  y={obj.y}
                  width={obj.width}
                  height={obj.height}
                  fill={obj.fill}
                  draggable
                  shadowColor={obj.shadowColor}
                  shadowBlur={obj.shadowBlur}
                  shadowOffsetX={obj.shadowOffsetX}
                  shadowOffsetY={obj.shadowOffsetY}
                  scaleX={obj.scaleX}
                  scaleY={obj.scaleY}
                  onDragStart={handleDragStart}
                  onDragEnd={(e) => handleDragEnd(e, index)}
                  onTransform={(e) => handleTransform(e, index)}
                  onDblClick={() => handleDeleteObject(index)}
                />
              );
            } else if (obj.type === "text") {
              return (
                <>
                  <Text
                    key={index}
                    x={obj.x}
                    y={obj.y}
                    text={obj.text}
                    fill={obj.fill}
                    fontSize={obj.fontSize}
                    fontFamily={obj.fontName}
                    draggable
                    scaleX={obj.scaleX}
                    scaleY={obj.scaleY}
                    onDragStart={(e) => handleDragTextStart(e, index)}
                    onDragEnd={handleDragTextEnd}
                    onTransform={(e) => handleTransform(e, index)}
                    onClick={() => handleTextEdit(index)}
                  />
                  {obj.textEditVisible && (
                    <textarea
                      style={{
                        position: "absolute",
                        left: obj.x,
                        top: obj.y,
                        width: obj.textAreaWidth,
                        height: obj.textAreaHeight,
                        fontFamily: obj.fontName,
                        fontSize: obj.fontSize,
                        padding: "0.5rem",
                        backgroundColor: "white",
                        boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
                      }}
                      value={obj.text}
                      onChange={(e) => handleTextChange(e, index)}
                    />
                  )}
                </>
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Gallery