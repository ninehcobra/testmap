"use client";
import { useEffect, useRef } from "react";

export default function Ver2() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const scale = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = "./map.png";
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      imageRef.current = image;
    };

    const handleMouseDown = (e) => {
      isDragging.current = true;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const deltaX = lastMousePosition.current.x - e.clientX; // Đảo ngược dấu của deltaX
        const deltaY = lastMousePosition.current.y - e.clientY; // Đảo ngược dấu của deltaY
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
        offsetX.current -= deltaX / scale.current;
        offsetY.current -= deltaY / scale.current;
        redrawCanvas();
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      if (delta > 0) {
        // Phóng to
        scale.current *= 1.1;
      } else {
        // Thu nhỏ
        scale.current *= 0.9;
      }
      redrawCanvas();
    };

    const redrawCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        imageRef.current,
        offsetX.current,
        offsetY.current,
        canvas.width / scale.current,
        canvas.height / scale.current
      );
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);
  const zoomIn = () => {
    if (scaleFactor < 4) {
      setScaleFactor(Math.min(scaleFactor * 1.1, 4)); // Tăng lên 20%, nhưng không vượt quá 4
    }
  };

  const zoomOut = () => {
    if (scaleFactor > 1) {
      setScaleFactor(Math.max(scaleFactor * 0, 1)); // Giảm đi 20%, nhưng không nhỏ hơn 1
    }
  };

  return (
    <div>
      <div>
        Ver 2<div></div>
      </div>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        style={{ border: "1px solid black", cursor: "grab" }}
      />
    </div>
  );
}
