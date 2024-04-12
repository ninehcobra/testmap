"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MapPage() {
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [svgLoaded, setSvgLoaded] = useState(false);

  const [mapSVGContent, setMapSVGContent] = useState("");

  useEffect(() => {
    const fetchMapSVG = async () => {
      const response = await fetch("/Hanoi_blank_map.svg");
      const svgContent = await response.text();
      setMapSVGContent(svgContent);
      setSvgLoaded(true);
    };

    fetchMapSVG();
  });

  useEffect(() => {
    if (!svgLoaded) {
      return;
    }
    const zoom = document.getElementById("zoom");

    const setTransform = () => {
      zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      setStart({ x: e.clientX - pointX, y: e.clientY - pointY });
      setPanning(true);
    };

    const handleMouseUp = () => {
      setPanning(false);
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (!panning) return;
      setPointX(e.clientX - start.x);
      setPointY(e.clientY - start.y);
      setTransform();
    };

    const handleWheel = (e) => {
      const zoomScale = 1.1;

      e.stopPropagation();
      let zoomX = e.offsetX;
      let zoomY = e.offsetY;

      let zoomDirection = e.deltaY;

      let scaledViewboxWidth;
      let scaledViewboxHeight;
      let scaledViewboxX;
      let scaledViewboxY;

      const zoomElement = document.getElementById("zoom");
      const viewBox = zoomElement.getAttribute("viewBox");

      let zoomLeftFraction = zoomX / zoomElement.clientWidth;
      let zoomTopFraction = zoomY / zoomElement.clientHeight;

      let [viewboxX, viewboxY, viewboxWidth, viewboxHeight] = viewBox
        .split(" ")
        .map((s) => parseFloat(s));

      console.log("viewbox", viewBox);
      if (zoomDirection > 0) {
        scaledViewboxWidth = viewboxWidth / zoomScale;
        scaledViewboxHeight = viewboxHeight / zoomScale;

        scaledViewboxX =
          viewboxX + (viewboxWidth - scaledViewboxWidth) * zoomLeftFraction;
        scaledViewboxY =
          viewboxY + (viewboxHeight - scaledViewboxHeight) * zoomTopFraction;
      } else {
        scaledViewboxWidth = viewboxWidth * zoomScale;
        scaledViewboxHeight = viewboxHeight * zoomScale;

        scaledViewboxX =
          viewboxX - (scaledViewboxWidth - viewboxWidth) * zoomLeftFraction;
        scaledViewboxY =
          viewboxY - (scaledViewboxHeight - viewboxHeight) * zoomTopFraction;
      }
      const scaledViewbox = [
        scaledViewboxX,
        scaledViewboxY,
        scaledViewboxWidth,
        scaledViewboxHeight,
      ]
        .map((s) => s.toFixed(2))
        .join(" ");

      zoomElement.setAttribute("viewBox", scaledViewbox);

      console.log(scaledViewbox);
    };

    zoom.addEventListener("mousedown", handleMouseDown);
    zoom.addEventListener("mouseup", handleMouseUp);
    zoom.addEventListener("mousemove", handleMouseMove);
    zoom.addEventListener("wheel", handleWheel);

    return () => {
      zoom.removeEventListener("mousedown", handleMouseDown);
      zoom.removeEventListener("mouseup", handleMouseUp);
      zoom.removeEventListener("mousemove", handleMouseMove);
      zoom.removeEventListener("wheel", handleWheel);
    };
  }, [panning, pointX, pointY, scale, start, svgLoaded]);

  console.log(panning);

  return (
    <div style={{ height: "100vh" }}>
      <div className="title">Ha Noi Map</div>
      <div
        className="map_container"
        style={{
          width: "100%",
          margin: "auto",
          backgroundColor: "#90DAEE",
          cursor: panning ? "grabbing" : "grab",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          viewBox="0 0 1000 1000"
          style={{
            transform: `translate(${pointX}px, ${pointY}px) scale(${scale})`,
          }}
        >
          <g dangerouslySetInnerHTML={{ __html: mapSVGContent }} />
        </svg>
      </div>
    </div>
  );
}
