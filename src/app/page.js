"use client"
import { useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css'
export default function Home() {
  const canvasRef = useRef(null);

  // Thực hiện thao tác trên phần tử canvas thông qua tham chiếu
  function drawCity(ctx, x, y, name) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();

    // Ghi tên của thành phố
    ctx.fillStyle = "black";
    ctx.fillText(name, x - 20, y - 15);
  }

  function drawRoad(ctx, startX, startY, endX, endY) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.backgroundColor = '#CAD3DC';
      canvasRef.current.style.border = "1px solid black";

      const ctx = canvasRef.current.getContext("2d");

      drawCity(ctx, 100, 100, "City A");
      drawCity(ctx, 50, 25, "City B");
      drawCity(ctx, 50, 100, "City C");

      drawRoad(ctx, 100, 100, 50, 25);
      drawRoad(ctx, 500, 400, 300, 100);
      drawRoad(ctx, 300, 100, 200, 200);


    }
  }, clearInterval())


  return (
    <div>
      {/* Tham chiếu đến phần tử canvas bằng useRef */}
      <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <canvas style={{ height: "85%" }} ref={canvasRef}></canvas>
      </div>

    </div>
  );
}
