"use client";

import { useMouse } from "react-use";
import { useRef, useState, useEffect } from "react";
import { useSpringValue, animated } from "@react-spring/web";
import styles from "./icons-overlay.module.css";
import RainbowWipeCanvas from "@components/RainbowWipeCanvas/RainbowWipeCanvas";
function IconsOverlay() {
  const ref = useRef(null);
  const { docX, docY } = useMouse(ref);
  const [innerWidth, setInnerWidth] = useState(0);

  // Set an initial value for the rawX calculation
  const [initialX, setInitialX] = useState(0.5); // 0.5 represents center of screen

  const rotation = useSpringValue(0, {
    config: {
      mass: 1,
      tension: 100,
      friction: 10,
    },
  });

  useEffect(() => {
    // Set initial window width
    setInnerWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (innerWidth === 0) return;

    // Use initialX if docX is 0 (no mouse movement yet)
    const x = docX === 0 ? initialX : docX / innerWidth;
    const rotationValue = (x * 360) / 2;
    rotation.start(rotationValue);
  }, [docX, innerWidth, rotation, initialX]);

  return (
    <span className={styles["overlay-container"]} aria-hidden="true" ref={ref}>
      <span className={styles["icons-container"]}>
        <span className={styles["icon-container"]}>
          <animated.img
            style={{ transform: rotation.to((r) => `rotate(${r}deg)`) }}
            src="icons/carousel-icon-4.svg"
          />
        </span>
        <span className={styles["icon-container"]}>
          <animated.img
            style={{ transform: rotation.to((r) => `rotate(${r * -2}deg)`) }}
            src="icons/carousel-icon-2.svg"
          />
        </span>
        <span className={styles["icon-container"]}>
          <animated.img
            style={{ transform: rotation.to((r) => `rotate(${r * -1.5}deg)`) }}
            src="icons/carousel-icon-3.svg"
          />
        </span>
        <span className={styles["icon-container"]}>
          <animated.img
            style={{ transform: rotation.to((r) => `rotate(${r * 2}deg)`) }}
            src="icons/carousel-icon-5.svg"
          />
        </span>
      </span>
      <span className={styles["rainbow-container"]} aria-hidden="true">
        <span className={styles["rainbow-icon-wrapper"]}>
          <RainbowWipeCanvas direction="right" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2081"
            className={styles["rainbow-icon"]}
            height="1051"
            viewBox="0 0 2081 1051"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <path
              id="path-1"
              d="M0 1050C0 -349 2081 -349 2081 1050H2045C2045 -302 36 -302 36 1050H0Z"
              fill="#B8FF67"
            />
            <path
              id="path-2"
              d="M280 1050C280 27 1801 27 1801 1050H1556C1556 357 525 357 525 1050H280Z"
              fill="#B6B8B7"
            />
            <path
              id="path-3"
              d="M36 1050C36 -302 2045 -302 2045 1050H1801C1801 27 280 27 280 1050H36Z"
              fill="#EE04A7"
            />
            <path
              id="path-4"
              d="M525 1050C525 357 1556 357 1556 1050H1471C1471 471 610 471 610 1050H525Z"
              fill="#018D44"
            />
            <path
              id="path-5"
              d="M610 1050C610 471 1471 471 1471 1050H1312C1312 685 769 685 769 1050H610Z"
              fill="#815B12"
            />
          </svg>
        </span>
      </span>
    </span>
  );
}

export default IconsOverlay;
