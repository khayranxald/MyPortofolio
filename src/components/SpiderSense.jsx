import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SpiderSense = ({ children, className = "", active = true }) => {
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const { theme } = useTheme();

  // Detect touch devices to skip hover-effects
  useEffect(() => {
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };
    setIsTouch(checkTouch());
  }, []);

  const getThemeColor = () => {
    switch (theme) {
      case "spider-blue":
        return "#0055ff";
      case "cyber-neon":
        return "#bc00dd";
      case "spider-red":
      default:
        return "#ff003c";
    }
  };

  const handleMouseEnter = () => {
    if (!active || isTouch) return;
    setIsHovered(true);

    const now = Date.now();
    // Spawn two concentric ripples with offsets
    setRipples([
      { id: `${now}-1`, scale: 2.2, delay: 0 },
      { id: `${now}-2`, scale: 2.8, delay: 0.15 },
    ]);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Clean up ripples after animation duration (800ms)
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples([]);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  const color = getThemeColor();

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {/* Spider Sense Concentric Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full border-2 aspect-square z-0"
            style={{
              borderColor: color,
              boxShadow: `0 0 12px ${color}, inset 0 0 12px ${color}`,
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              width: "100%",
              height: "100%",
            }}
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: ripple.scale, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: ripple.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Child element animation - subtle twitch on hover */}
      <motion.div
        animate={
          isHovered && !isTouch
            ? {
                scale: [1, 1.03, 0.98, 1.01, 1],
                rotateZ: [0, 1, -1, 0.5, 0],
                transition: { duration: 0.35, ease: "easeInOut" },
              }
            : { scale: 1, rotateZ: 0 }
        }
        className="relative z-10 w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SpiderSense;
