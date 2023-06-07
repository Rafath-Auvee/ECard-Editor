// import React, { useEffect, useRef } from "react";
// import Konva from "konva";

// const Demo = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const images = [
//       "http://www.fujifilm.com/products/digital_cameras/x/fujifilm_x100f/sample_images/img/index/pic_01.jpg",
//       "https://sapevp.tamba.co.uk/img/grid.png",
//       "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       "https://as2.ftcdn.net/jpg/02/84/36/59/500_F_284365935_RQAZNpqkgzIyCRWibM3a3t2tgwWpkHP1.jpg",
//       "https://images.pexels.com/photos/2600418/pexels-photo-2600418.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     ];

//     const width = 500;
//     const height = 350;

//     const stage = new Konva.Stage({
//       container: containerRef.current,
//       width: width,
//       height: height,
//     });

//     const layer1 = new Konva.Layer({
//       name: "layer1",
//     });

//     const layer2 = new Konva.Layer({
//       name: "layer2",
//     });

//     stage.add(layer1);
//     stage.add(layer2);

//     Konva.Image.fromURL(images[0], (firstImage) => {
//       firstImage.position({
//         x: 0,
//         y: 0,
//       });
//       firstImage.setAttrs({
//         name: "background",
//         width: width,
//         height: height,
//         draggable: false,
//       });

//       addAnchor(firstImage, 0, 0, "topLeft");
//       addAnchor(firstImage, 200, 0, "topRight");
//       addAnchor(firstImage, 200, 138, "bottomRight");
//       addAnchor(firstImage, 0, 138, "bottomLeft");

//       layer1.add(firstImage);
//       layer1.draw();
//     });

//     Konva.Image.fromURL(images[1], (secondImage) => {
//       secondImage.position({
//         x: 0,
//         y: 0,
//       });

//       secondImage.setAttrs({
//         name: "grid",
//         width: width,
//         height: height,
//         draggable: true,
//         globalCompositeOperation: "destination-out",
//       });

//       layer1.add(secondImage);
//       layer1.draw();
//     });

//     Konva.Image.fromURL(images[2], (thirdImage) => {
//       thirdImage.position({
//         x: 300,
//         y: 100,
//       });

//       thirdImage.setAttrs({
//         name: "man",
//         width: 160,
//         height: 230,
//         draggable: true,
//       });

//       layer2.add(thirdImage);
//       layer2.draw();
//       stage.find(".layer2").moveToBottom();
//     });

//     Konva.Image.fromURL(images[3], (fourthImage) => {
//       fourthImage.position({
//         x: 200,
//         y: 100,
//       });

//       fourthImage.setAttrs({
//         name: "man",
//         width: 160,
//         height: 230,
//         draggable: true,
//       });

//       layer2.add(fourthImage);
//       layer2.draw();
//       stage.find(".layer2").moveToTop();
//     });

//     Konva.Image.fromURL(images[4], (fifthImage) => {
//       fifthImage.position({
//         x: 200,
//         y: 100,
//       });

//       fifthImage.setAttrs({
//         name: "man",
//         width: 160,
//         height: 230,
//         draggable: true,
//       });

//       layer2.add(fifthImage);
//       layer2.draw();
//       stage.find(".layer2").moveToTop();
//     });

//     const addAnchor = (image, x, y, name) => {
      
//         const anchor = new Konva.Circle({
//         x: x,
//         y: y,
//         stroke: "#666",
//         fill: "#ddd",
//         strokeWidth: 2,
//         radius: 8,
//         name: name,
//         draggable: true,
//         dragOnTop: false,
//       });

//       anchor.on("dragmove", () => {
//         update(image, anchor);
//         layer1.batchDraw();
//       });

//       anchor.on("mousedown touchstart", () => {
//         image.draggable(false);
//         layer1.draw();
//       });

//       anchor.on("dragend", () => {
//         image.draggable(true);
//         layer1.draw();
//       });

//       anchor.on("mouseover", () => {
//         document.body.style.cursor = "pointer";
//       });

//       anchor.on("mouseout", () => {
//         document.body.style.cursor = "default";
//       });

//       layer1.add(anchor);
//     };

//     const update = (image, anchor) => {
//       const topLeft = layer1.findOne(".topLeft");
//       const topRight = layer1.findOne(".topRight");
//       const bottomRight = layer1.findOne(".bottomRight");
//       const bottomLeft = layer1.findOne(".bottomLeft");
//       const imageAttrs = {
//         x: topLeft.x(),
//         y: topLeft.y(),
//         width: topRight.x() - topLeft.x(),
//         height: bottomLeft.y() - topLeft.y(),
//       };

//       image.position(imageAttrs);
//       image.size(imageAttrs);
//       anchor.position(image.position());
//     };

//     // Cleanup event listeners on unmount
//     return () => {
//       stage.destroy();
//     };
//   }, []);

//   return <div ref={containerRef}></div>;
// };

// export default Demo;
