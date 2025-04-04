"use client";

import { useEffect, useRef } from "react";

import styles from "../IconsOverlay/icons-overlay.module.css";

function RainbowWipeCanvas({ x }) {
  const canvasRef = useRef(null);
  console.log("canvas x", x);

  function draw() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the drawing
    const lineWidth = canvas.width / 2;
    ctx.strokeStyle = "#e7ecd8";
    ctx.lineWidth = lineWidth * 1.5;

    // Draw the arc
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height,
      lineWidth / 2,
      Math.PI,
      (x + 1) * Math.PI
    );
    ctx.stroke();
  }

  useEffect(() => {
    draw();
  }, [x]);

  return (
    <canvas
      className={styles["rainbow-wipe-canvas"]}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasRef}
    />
  );
}

export default RainbowWipeCanvas;
