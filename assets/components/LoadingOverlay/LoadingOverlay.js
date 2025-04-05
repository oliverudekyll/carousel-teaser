"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./loading-overlay.module.css";

// Animation settings
const ANIMATION_EASE = [0.86, 0, 0.07, 1];
const ANIMATION_DURATION = 1.75;
const BLOCK_ANIMATION_DURATION = 1.4;

// Predefine animation variants to avoid object creation on render
const wrapperVariants = {
  initial: (width) => ({ width: `${width}%` }),
  animate: {
    pink: {
      width: ["43.75%", "50%", "0%", "0%"],
      transition: {
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        times: [0, 0.33, 0.66, 1],
      },
    },
    brown: {
      width: ["56.25%", "50%", "0%", "0%"],
      transition: {
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        times: [0, 0.33, 0.66, 1],
      },
    },
  },
};

const blockVariants = {
  initial: (width) => ({ width: `${width}%` }),
  animate: {
    pink: {
      width: ["60%", "80%", "80%"],
      transition: {
        duration: BLOCK_ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        times: [0, 0.5, 1],
      },
    },
    brown: {
      width: ["40%", "20%", "20%"],
      transition: {
        duration: BLOCK_ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        times: [0, 0.5, 1],
      },
    },
    gray: {
      width: ["24%", "50%", "50%"],
      transition: {
        duration: BLOCK_ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        times: [0, 0.5, 1],
      },
    },
    teal: {
      width: ["76%", "50%", "50%"],
      transition: {
        duration: BLOCK_ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        times: [0, 0.5, 1],
      },
    },
  },
};

// Memoized component to prevent unnecessary re-renders
const LoadingOverlay = memo(function LoadingOverlay() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Short timeout to trigger animation once component mounts
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 10);

    // After animation completes, remove from DOM
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Give enough time for animation to complete

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // If animation is complete and we've removed from DOM, return null to prevent rendering
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles["loading-overlay"]}
        initial={{ opacity: 1 }}
        animate={hasLoaded ? { opacity: 1 } : {}}
        exit={{ opacity: 0 }}
      >
        <motion.span
          className={styles["blocks-wrapper"]}
          custom={43.75}
          initial="initial"
          animate={hasLoaded ? wrapperVariants.animate.pink : {}}
          variants={wrapperVariants}
        >
          <motion.span
            className={`${styles["loading-overlay__block"]} ${styles["block--pink"]} `}
            custom={60}
            initial="initial"
            animate={hasLoaded ? blockVariants.animate.pink : {}}
            variants={blockVariants}
          />
          <motion.span
            className={`${styles["loading-overlay__block"]} ${styles["block--brown"]} `}
            custom={40}
            initial="initial"
            animate={hasLoaded ? blockVariants.animate.brown : {}}
            variants={blockVariants}
          />
        </motion.span>
        <motion.span
          className={styles["blocks-wrapper"]}
          custom={56.25}
          initial="initial"
          animate={hasLoaded ? wrapperVariants.animate.brown : {}}
          variants={wrapperVariants}
        >
          <motion.span
            className={`${styles["loading-overlay__block"]} ${styles["block--gray"]} `}
            custom={24}
            initial="initial"
            animate={hasLoaded ? blockVariants.animate.gray : {}}
            variants={blockVariants}
          />
          <motion.span
            className={`${styles["loading-overlay__block"]} ${styles["block--teal"]} `}
            custom={76}
            initial="initial"
            animate={hasLoaded ? blockVariants.animate.teal : {}}
            variants={blockVariants}
          />
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
});

export default LoadingOverlay;
