import { useState, useEffect } from "react";

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, isTouch: false });

  useEffect(() => {
    // Check if the device has touch capabilities
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    const isTouchDevice = checkTouch();

    if (isTouchDevice) {
      setPosition((prev) => ({ ...prev, isTouch: true }));
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY, isTouch: false });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};
