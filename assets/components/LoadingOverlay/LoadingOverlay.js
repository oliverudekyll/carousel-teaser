"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import styles from "./loading-overlay.module.css";

function LoadingOverlay() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles["loading-overlay"]}>
      <motion.span
        className={styles["blocks-wrapper"]}
        initial={{ width: "43.75%" }}
        animate={
          hasLoaded
            ? {
                width: ["43.75%", "50%", "0%", "0%"],
                transition: {
                  duration: 1.35,
                  ease: [0.86, 0, 0.07, 1],
                  times: [0, 0.33, 0.66, 1],
                },
              }
            : {}
        }
      >
        <motion.span
          className={`${styles["loading-overlay__block"]} ${styles["block--pink"]} `}
          initial={{ width: "60%" }}
          animate={
            hasLoaded
              ? {
                  width: ["60%", "80%", "80%"],
                  transition: {
                    duration: 0.7,
                    ease: [0.86, 0, 0.07, 1],
                    times: [0, 0.5, 1],
                  },
                }
              : {}
          }
        ></motion.span>
        <motion.span
          className={`${styles["loading-overlay__block"]} ${styles["block--brown"]} `}
          initial={{ width: "40%" }}
          animate={
            hasLoaded
              ? {
                  width: ["40%", "20%", "20%"],
                  transition: {
                    duration: 0.7,
                    ease: [0.86, 0, 0.07, 1],
                    times: [0, 0.5, 1],
                  },
                }
              : {}
          }
        ></motion.span>
      </motion.span>
      <motion.span
        className={styles["blocks-wrapper"]}
        initial={{ width: "56.25%" }}
        animate={
          hasLoaded
            ? {
                width: ["56.25%", "50%", "0%", "0%"],
                transition: {
                  duration: 1.35,
                  ease: [0.86, 0, 0.07, 1],
                  times: [0, 0.33, 0.66, 1],
                },
              }
            : {}
        }
      >
        <motion.span
          className={`${styles["loading-overlay__block"]} ${styles["block--gray"]} `}
          initial={{ width: "24%" }}
          animate={
            hasLoaded
              ? {
                  width: ["24%", "50%", "50%"],
                  transition: {
                    duration: 0.7,
                    ease: [0.86, 0, 0.07, 1],
                    times: [0, 0.5, 1],
                  },
                }
              : {}
          }
        ></motion.span>
        <motion.span
          className={`${styles["loading-overlay__block"]} ${styles["block--teal"]} `}
          initial={{ width: "76%" }}
          animate={
            hasLoaded
              ? {
                  width: ["76%", "50%", "50%"],
                  transition: {
                    duration: 0.7,
                    ease: [0.86, 0, 0.07, 1],
                    times: [0, 0.5, 1],
                  },
                }
              : {}
          }
        ></motion.span>
      </motion.span>
    </div>
  );
}

export default LoadingOverlay;
