"use client";

import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Pontano_Sans } from "next/font/google";
export default function Home() {
  const canvasRef = useRef(null);
  const [initial, setInitial] = useState(true);

  const [cooX, setCooX] = useState(0);
  const [cooY, setCooY] = useState(0);
  const [points, setPoints] = useState([]);

  // Thực hiện thao tác trên phần tử canvas thông qua tham chiếu
  const drawStreet = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 20);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const getCoordinate = (e, canvasRef, ctx) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCooX(x);
    setCooY(y);

    const newPoints = points;

    newPoints.push({ x: x, y: y });

    setPoints(newPoints);
  };

  const initialDraw = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.quadraticCurveTo(250, 170, 245, 304);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(245, 304);
    ctx.lineTo(232, 363);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(232, 363);
    ctx.lineTo(237, 382);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(237, 382);
    ctx.lineTo(207, 444);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(207, 444);
    ctx.lineTo(190, 443);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(190, 443);
    ctx.lineTo(189, 447);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(189, 447);
    ctx.lineTo(181, 446);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(181, 446);
    ctx.quadraticCurveTo(250, 170, 0, 531);
    ctx.stroke();
  };

  //
  useEffect(() => {
    if (initial) {
      if (canvasRef.current) {
        canvasRef.current.style.backgroundColor = "#CAD3DC";
        canvasRef.current.style.border = "1px solid black";
        const ctx = canvasRef.current.getContext("2d");
        canvasRef.current.addEventListener("mousemove", (e) =>
          getCoordinate(e, canvasRef, ctx)
        );
        canvasRef.current.height = window.innerHeight * 0.95;
        canvasRef.current.width = window.innerWidth * 0.95;
      }

      initialDraw();

      setInitial(false);
    }

    // draw();
  }, [cooX, cooY, points]);

  function draw() {
    // Vẽ các điểm
    const ctx = canvasRef.current.getContext("2d");
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  return (
    <div>
      {/* Tham chiếu đến phần tử canvas bằng useRef */}
      <div
        style={{ width: "100vw", textAlign: "center" }}
      >{`Tọa độ x=${cooX}, y=${cooY}`}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          width: "100vw",
        }}
      >
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
