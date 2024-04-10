"use client";

import { useEffect, useState } from "react";

export default function MapPage() {
  const [mapSVGContent, setMapSVGContent] = useState("");
  const [scaleFactor, setScaleFactor] = useState(); // Giả sử scale factor là 0.5 (50%)

  useEffect(() => {
    const fetchMapSVG = async () => {
      const response = await fetch("/Hanoi_blank_map.svg");
      const svgContent = await response.text();
      setMapSVGContent(svgContent);
    };

    fetchMapSVG();
  }, []);

  return (
    <div>
      <div className="title">Ha noi map</div>
      <div className="map_container" style={{ width: "50%", margin: "auto" }}>
        {" "}
        {/* Thay đổi kích thước và vị trí của SVG container */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          viewBox="0 0 1000 1000"
          style={{ transform: `scale(${scaleFactor})` }} // Sử dụng transform để scale SVG
        >
          <g dangerouslySetInnerHTML={{ __html: mapSVGContent }} />
        </svg>
      </div>
    </div>
  );
}
