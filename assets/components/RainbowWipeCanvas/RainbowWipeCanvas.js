"use client";

import { useEffect, useRef, useState } from "react";
import { useMouse } from "react-use";

import styles from "../IconsOverlay/icons-overlay.module.css";

function RainbowWipeCanvas({ direction, strokeWhite = false }) {
  const canvasRef = useRef(null);
  const { docX, docY } = useMouse(canvasRef);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [rawX, setRawX] = useState(0);

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;
    setRawX(docX / dimensions.width);
  }, [docX, dimensions.width]);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the drawing
    const lineWidth = canvas.width / 2;
    ctx.strokeStyle = strokeWhite ? "#ffffff" : "#e7ecd8";
    ctx.lineWidth = lineWidth * 1.5;

    // Draw the arc
    ctx.beginPath();
    if (direction === "right") {
      ctx.arc(
        canvas.width / 2,
        canvas.height,
        lineWidth / 2,
        (rawX + 1) * Math.PI,
        2 * Math.PI
      );
    } else {
      ctx.arc(
        canvas.width / 2,
        canvas.height,
        lineWidth / 2,
        1 * Math.PI,
        (rawX + 1) * Math.PI
      );
    }
    ctx.stroke();
  }

  useEffect(() => {
    if (dimensions.width === 0) return;
    draw();
  }, [rawX, dimensions]);

  return (
    <canvas
      className={styles["rainbow-wipe-canvas"]}
      width={dimensions.width}
      height={dimensions.height}
      ref={canvasRef}
    />
  );
}

export default RainbowWipeCanvas;
