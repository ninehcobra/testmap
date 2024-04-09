"use client"
import { useEffect, useRef } from "react";

export default function Ver2() {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const isDragging = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);
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
            lastX.current = e.clientX;
            lastY.current = e.clientY;
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        const handleMouseMove = (e) => {
            if (isDragging.current) {
                const deltaX = e.clientX - lastX.current;
                const deltaY = e.clientY - lastY.current;
                lastX.current = e.clientX;
                lastY.current = e.clientY;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    imageRef.current,
                    0 - deltaX / scale.current,
                    0 - deltaY / scale.current,
                    canvas.width / scale.current,
                    canvas.height / scale.current,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                imageRef.current,
                0,
                0,
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

    return (
        <div>
            <div>Ver 2</div>
            <canvas
                ref={canvasRef}
                width="500"
                height="500"
                style={{ border: "1px solid black" }}
            />
        </div>
    );
}
