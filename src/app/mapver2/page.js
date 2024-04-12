"use client";

import React, { useEffect, useState } from "react";

export default function MapPage() {
  const [mapSVGContent, setMapSVGContent] = useState("");
  const [panZoom, setPanZoom] = useState(null);

  useEffect(() => {
    const fetchMapSVG = async () => {
      const response = await fetch("/Hanoi_blank_map.svg");
      const svgContent = await response.text();
      setMapSVGContent(svgContent);
    };

    fetchMapSVG();
  }, []);

  useEffect(() => {
    if (mapSVGContent && typeof window !== "undefined") {
      import("svg-pan-zoom").then((svgPanZoom) => {
        const svgElement = document.getElementById("zoom");
        const panZoomInstance = svgPanZoom.default(svgElement, {
          maxZoom: 100,
          minZoom: 1,
        });
        setPanZoom(panZoomInstance);
      });
    }
  }, [mapSVGContent]);

  return (
    <div style={{ height: "100vh" }}>
      <div className="title">Ha Noi Map</div>
      <div
        className="map_container"
        style={{
          width: "100%",
          margin: "auto",
          backgroundColor: "#90DAEE",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          viewBox="0 0 1000 1000"
          id="zoom"
        >
          <g dangerouslySetInnerHTML={{ __html: mapSVGContent }} />
        </svg>
      </div>
    </div>
  );
}
