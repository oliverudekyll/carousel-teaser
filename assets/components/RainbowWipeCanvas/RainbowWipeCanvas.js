"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { useMouse } from "react-use";

import styles from "../IconsOverlay/icons-overlay.module.css";

// Cubic bezier implementation
function cubicBezier(t, p1x, p1y, p2x, p2y) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t) {
    return ((ay * t + by) * t + cy) * t;
  }

  function sampleCurveDerivativeX(t) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function solveCurveX(x, epsilon = 1e-6) {
    let t0 = 0;
    let t1 = 1;
    let t2 = x;

    if (x <= 0) return 0;
    if (x >= 1) return 1;

    // Newton's method
    for (let i = 0; i < 8; i++) {
      const x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) return t2;

      const d2 = sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < epsilon) break;

      t2 = t2 - x2 / d2;
    }

    // Bisection method
    while (t1 - t0 > epsilon) {
      const t2 = (t0 + t1) / 2;
      if (sampleCurveX(t2) > x) {
        t1 = t2;
      } else {
        t0 = t2;
      }
    }

    return t2;
  }

  return sampleCurveY(solveCurveX(t));
}

const RainbowWipeCanvas = memo(function RainbowWipeCanvas({
  direction,
  fillWhite = false,
}) {
  const canvasRef = useRef(null);
  const ref = useRef(null);
  const mouseState = useMouse(ref);
  const { docX } = mouseState;

  // Store all mutable state in refs to avoid re-renders
  const stateRef = useRef({
    dimensions: { width: 0, height: 0 },
    rawX: 0,
    mouseMoved: false,
    rainbowLoaded: false,
    animatedX: 0,
    animationFrame: null,
    animationStartTime: null,
    animationStartX: 0,
    animationTargetX: 0,
    lastFrameTime: 0,
    prevAnimatedX: 0,
    canvasContext: null,
    ease: [0.86, 0, 0.07, 1],
    animationDuration: 1200,
  });

  // Initialize canvas and dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    stateRef.current.canvasContext = canvas.getContext("2d");

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Only update if dimensions actually changed
      if (
        width !== stateRef.current.dimensions.width ||
        height !== stateRef.current.dimensions.height
      ) {
        stateRef.current.dimensions = { width, height };

        // Update canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Force redraw
        drawCanvas();
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Handle window resize
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);

      // Clean up animation frame on unmount
      if (stateRef.current.animationFrame) {
        cancelAnimationFrame(stateRef.current.animationFrame);
      }
    };
  }, []);

  // Mouse movement tracking
  useEffect(() => {
    if (stateRef.current.dimensions.width === 0) return;

    const newRawX = docX / stateRef.current.dimensions.width;
    stateRef.current.rawX = newRawX;
    stateRef.current.animationTargetX = newRawX;

    // Mark that mouse has moved
    if (docX !== 0 && !stateRef.current.mouseMoved) {
      stateRef.current.mouseMoved = true;
      // Start animation on first mouse move
      startAnimation();
    }

    // If we're already done with the initial animation, update position directly
    if (stateRef.current.rainbowLoaded) {
      stateRef.current.animatedX = newRawX;
      drawCanvas();
    }
  }, [docX]);

  // Draw the canvas
  const drawCanvas = useCallback(() => {
    const {
      canvasContext: ctx,
      dimensions,
      animatedX,
      rainbowLoaded,
      rawX,
    } = stateRef.current;
    if (!ctx || dimensions.width === 0) return;

    // Get the current value to draw
    const x = rainbowLoaded ? rawX : animatedX;

    // Clear the canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Set up the drawing
    const lineWidth = dimensions.width / 2;
    ctx.fillStyle = fillWhite ? "#ffffff" : "#e7ecd8";
    ctx.lineWidth = lineWidth * 1.5;

    // Draw the arc
    ctx.beginPath();

    ctx.moveTo(dimensions.width / 2, dimensions.height);
    ctx.arc(
      dimensions.width / 2,
      dimensions.height,
      dimensions.width / 1.5,
      (x + 1) * Math.PI,
      2 * Math.PI
    );

    ctx.fill();
    ctx.rotate((1 * Math.PI) / 180); // Rotate 1 degree
    ctx.rotate((-1 * Math.PI) / 180); // Rotate -1 degree
  }, [direction, fillWhite]);

  // Animation logic
  const startAnimation = useCallback(() => {
    const state = stateRef.current;

    // Don't start if already running or already loaded
    if (state.animationFrame || state.rainbowLoaded) return;

    // Store animation start data
    state.animationStartTime = performance.now();
    state.animationStartX = state.animatedX;

    const animationLoop = (timestamp) => {
      const state = stateRef.current;

      // Throttle to avoid excessive rendering
      if (timestamp - state.lastFrameTime < 16) {
        // limit to ~60fps
        state.animationFrame = requestAnimationFrame(animationLoop);
        return;
      }

      state.lastFrameTime = timestamp;

      const elapsed = timestamp - state.animationStartTime;
      const progress = Math.min(elapsed / state.animationDuration, 1);
      const { ease } = state;
      const easedProgress = cubicBezier(
        progress,
        ease[0],
        ease[1],
        ease[2],
        ease[3]
      );

      // Calculate new position
      const nextX =
        state.animationStartX +
        (state.animationTargetX - state.animationStartX) * easedProgress;

      // Only update if there's a meaningful change
      if (Math.abs(nextX - state.prevAnimatedX) > 0.0001) {
        state.animatedX = nextX;
        state.prevAnimatedX = nextX;
        drawCanvas();
      }

      // Check for animation completion
      if (progress < 1) {
        state.animationFrame = requestAnimationFrame(animationLoop);
      } else {
        // Complete the animation
        state.animatedX = state.animationTargetX;
        state.rainbowLoaded = true;
        state.animationFrame = null;
        state.animationStartTime = null;
        drawCanvas();
      }
    };

    state.animationFrame = requestAnimationFrame(animationLoop);
  }, [drawCanvas]);

  // Respond to direction or fillWhite prop changes
  useEffect(() => {
    drawCanvas();
  }, [direction, fillWhite, drawCanvas]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <canvas className={styles["rainbow-wipe-canvas"]} ref={canvasRef} />
    </div>
  );
});

export default RainbowWipeCanvas;
