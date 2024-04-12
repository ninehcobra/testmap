"use client";

import React, { useEffect, useState } from "react";

export default function MapPage() {
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const [mapSVGContent, setMapSVGContent] = useState("");

  useEffect(() => {
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
      e.preventDefault();
      var xs = (e.clientX - pointX) / scale;
      var ys = (e.clientY - pointY) / scale;
      var delta = e.deltaY > 0 ? -0.1 : 0.1;
      var newScale = scale + delta;
      if (newScale <= 18 && newScale >= 1) {
        setScale(newScale);
        setPointX(e.clientX - xs * newScale);
        setPointY(e.clientY - ys * newScale);
        setTransform();
      }
    };

    zoom.addEventListener("mousedown", handleMouseDown);
    zoom.addEventListener("mouseup", handleMouseUp);
    zoom.addEventListener("mousemove", handleMouseMove);
    zoom.addEventListener("wheel", handleWheel);

    const fetchMapSVG = async () => {
      const response = await fetch("/Hanoi_blank_map.svg");
      const svgContent = await response.text();
      setMapSVGContent(svgContent);
    };

    fetchMapSVG();

    return () => {
      zoom.removeEventListener("mousedown", handleMouseDown);
      zoom.removeEventListener("mouseup", handleMouseUp);
      zoom.removeEventListener("mousemove", handleMouseMove);
      zoom.removeEventListener("wheel", handleWheel);
    };
  }, [panning, pointX, pointY, scale, start]);

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
          id="zoom"
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
