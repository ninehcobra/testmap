"use client";
import React, { useEffect, useState } from "react";

export default function MapPage() {
  const [mapSVGContent, setMapSVGContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [district, setDistrict] = useState("");
  const [panZoom, setPanZoom] = useState(null);

  useEffect(() => {
    const fetchMapSVG = async () => {
      const response = await fetch("/Hanoi_blank_map.svg");
      const svgContent = await response.text();
      setMapSVGContent(svgContent);
    };

    fetchMapSVG();
  }, []);

  const handleMouseMove = (event) => {
    const svg = document.getElementById("zoom");
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    setMousePosition({ x, y });
  };

  useEffect(() => {
    if (mapSVGContent && typeof window !== "undefined") {
      // import("svg-pan-zoom").then((svgPanZoom) => {
      //   const svgElement = document.getElementById("zoom");
      //   const panZoomInstance = svgPanZoom.default(svgElement, {
      //     maxZoom: 100,
      //     minZoom: 1,
      //     dblClickZoomEnabled: false,
      //     preventMouseEventsDefault: false,
      //   });
      //   setPanZoom(panZoomInstance);

      //   // Di chuyển gọi hàm thêm sự kiện vào đây
      // });
      addEventListenerToDistrics();
    }
  }, [mapSVGContent]);

  const handleDistrictClick = (event) => {
    // Xử lý sự kiện khi phần tử district được click
    alert(event.target.dataset.name);
    if (event.target.style.fill === "red") {
      event.target.style.fill = "#b9b9b9";
      setDistrict(event.target.dataset.name);
    } else {
      event.target.style.fill = "red";
    }
  };

  const addEventListenerToDistrics = () => {
    const districts = document.querySelectorAll(".district");

    districts.forEach((district) => {
      district.addEventListener("click", handleDistrictClick);
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="title">Ha Noi Map</div>
      <div>{`Tọa độ x=${mousePosition.x}, y=${mousePosition.y}.          Quận/Huyện:${district}`}</div>
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
          onMouseMove={handleMouseMove}
        >
          <g dangerouslySetInnerHTML={{ __html: mapSVGContent }} />
        </svg>
      </div>
    </div>
  );
}
