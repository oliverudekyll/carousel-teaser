"use client";

import { useMouse } from "react-use";
import { useRef } from "react";
import { useSpringValue, animated } from "@react-spring/web";
import styles from "./icons-overlay.module.css";
import RainbowWipeCanvas from "@components/RainbowWipeCanvas/RainbowWipeCanvas";
function IconsOverlay() {
  const ref = useRef(null);
  const { docX, docY } = useMouse(ref);

  const rotation = useSpringValue(0, {
    config: {
      mass: 1,
      tension: 100,
      friction: 10,
    },
  });

  console.log("docX", docX);
  console.log("docY", docY);

  const innerWidth = window.innerWidth;
  const x = docX / innerWidth;
  const y = docY / innerWidth;
  const rotationValue = (x * 360) / 2;
  rotation.start(rotationValue);

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
            src="icons/carousel-icon-1.svg"
          />
        </span>
      </span>
      <span className={styles["rainbow-container"]} aria-hidden="true">
        <span className={styles["rainbow-icon-wrapper"]}>
          <RainbowWipeCanvas x={x} />
          <img
            className={styles["rainbow-icon"]}
            src="icons/carousel-rainbow.svg"
          />
        </span>
      </span>
    </span>
  );
}

export default IconsOverlay;
