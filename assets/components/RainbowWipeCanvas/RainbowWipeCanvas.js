"use client";

import { useEffect, useRef } from "react";
import { useMouse } from "react-use";
import { useSpringValue } from "@react-spring/web";

import styles from "../IconsOverlay/icons-overlay.module.css";

function RainbowWipeCanvas({ direction, strokeWhite = false }) {
  const canvasRef = useRef(null);
  const { docX, docY } = useMouse(canvasRef);
  const rawX = docX / window.innerWidth;

  const x = useSpringValue(rawX, {
    config: { tension: 200, friction: 20 },
  });
  x.start(rawX);
  let springX = x.get();
  useEffect(() => {
    x.start(rawX);
    springX = x.get();
  }, [rawX]);

  function draw() {
    const canvas = canvasRef.current;
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
        (springX + 1) * Math.PI,
        2 * Math.PI
      );
    } else {
      ctx.arc(
        canvas.width / 2,
        canvas.height,
        lineWidth / 2,
        1 * Math.PI,
        (springX + 1) * Math.PI
      );
    }
    ctx.stroke();
  }

  useEffect(() => {
    window.addEventListener("resize", draw);
    return () => {
      window.removeEventListener("resize", draw);
    };
  }, []);

  useEffect(() => {
    draw();
  }, [rawX, springX]);

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
