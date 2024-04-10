"use client";

import { useEffect, useState } from "react";
import { throttle } from "lodash";

export default function MapPage() {
  const [mapSVGContent, setMapSVGContent] = useState("");
  const [scaleFactor, setScaleFactor] = useState(1); // Giả sử scale factor là 0.5 (50%)

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX - event.currentTarget.getBoundingClientRect().left);
    setStartY(event.clientY - event.currentTarget.getBoundingClientRect().top);
  };

  const handleMouseMoveThrottled = throttle((event) => {
    if (!isDragging || !event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - startX;
    const offsetY = event.clientY - rect.top - startY;
    event.currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, 10);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const fetchMapSVG = async () => {
      const response = await fetch("/Hanoi_blank_map.svg");
      const svgContent = await response.text();
      setMapSVGContent(svgContent);
      addClickEventToPaths();
    };

    fetchMapSVG();
  }, []);

  const addClickEventToPaths = () => {
    const path = document.getElementById("g524");
    console.log(path);
    if (path) {
      path.addEventListener("click", handlePathClick); // Gắn sự kiện click vào mỗi phần tử <path>
    }
  };

  const handlePathClick = (e) => {
    alert("Huyện ba vì");
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      // Cuộn lên => zoom in
      zoomIn();
    } else {
      // Cuộn xuống => zoom out
      zoomOut();
    }
  };

  const zoomIn = () => {
    if (scaleFactor < 4) {
      setScaleFactor(Math.min(scaleFactor * 1.1, 4)); // Tăng lên 20%, nhưng không vượt quá 4
    }
  };

  const zoomOut = () => {
    if (scaleFactor > 1) {
      setScaleFactor(Math.max(scaleFactor * 0.9, 1)); // Giảm đi 20%, nhưng không nhỏ hơn 1
    }
  };

  return (
    <div>
      <div className="title">
        Ha noi map
        <div>
          <div>
            <button onClick={zoomIn}>Zoom In</button>
            <button onClick={zoomOut}>Zoom Out</button>
          </div>
        </div>
      </div>
      <div className="map_container" style={{ width: "50%", margin: "auto" }}>
        {" "}
        {/* Thay đổi kích thước và vị trí của SVG container */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          viewBox="0 0 1000 1000"
          style={{ transform: `scale(${scaleFactor})` }}
          onWheel={handleWheel} // Sử dụng transform để scale SVG
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveThrottled}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <g dangerouslySetInnerHTML={{ __html: mapSVGContent }} />
        </svg>
      </div>
    </div>
  );
}
