import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail } from "react-icons/fi";

const dockItems = [
  { id: "hero", label: "Home", icon: FiHome },
  { id: "about", label: "About", icon: FiUser },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "projects", label: "Projects", icon: FiBriefcase },
  { id: "contact", label: "Contact", icon: FiMail },
];

const iOSDock = ({ activeSection = "hero" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mouseIsNear, setMouseIsNear] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const dockRef = useRef(null);
  const { theme } = useTheme();

  // Track scroll direction to auto-hide/show dock
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolling down and scrolled past 150px -> hide
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        // Scrolling up -> show
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect touch devices
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

  const color = getThemeColor();

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Magnification logic: calculate custom scale based on mouse distance
  const [scales, setScales] = useState(dockItems.map(() => 1));

  const handleMouseMove = (e) => {
    if (isTouch || !dockRef.current) return;
    setMouseIsNear(true);

    const dockRect = dockRef.current.getBoundingClientRect();
    const mouseX = e.clientX;

    // Measure centers of all items and update scales
    const itemElements = dockRef.current.querySelectorAll(".dock-item-btn");
    const newScales = Array.from(itemElements).map((el) => {
      const rect = el.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);
      
      // standard magnification formula: scale drops from 1.5 to 1.0 depending on distance
      const maxDistance = 140; // range of influence
      if (distance < maxDistance) {
        const factor = 1 - distance / maxDistance;
        return 1 + factor * 0.5; // max scale 1.5
      }
      return 1;
    });

    setScales(newScales);
  };

  const handleMouseLeave = () => {
    setMouseIsNear(false);
    setScales(dockItems.map(() => 1));
    setHoveredIndex(null);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto flex items-end gap-3 px-4 py-2.5 rounded-[24px] glass-card glass-card-glow border border-white/5 shadow-2xl relative"
        aria-label="iOS Navigation Dock"
        style={{
          height: "64px",
          transition: "background-color 0.3s ease",
        }}
      >
        {/* Dock Items Loop */}
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const scale = scales[idx] || 1;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center justify-end h-full"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              {/* Tooltip on hover */}
              {hoveredIndex === idx && !isTouch && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -20, scale: 1 }}
                  className="absolute bottom-16 px-2.5 py-1 rounded-lg text-[10px] font-mono glass-card border border-white/10 text-slate-200 uppercase tracking-widest pointer-events-none whitespace-nowrap"
                  style={{
                    boxShadow: `0 4px 12px rgba(0,0,0,0.5), 0 0 6px ${color}33`,
                  }}
                >
                  {item.label}
                </motion.div>
              )}

              {/* Magnified button */}
              <button
                onClick={() => handleNavClick(item.id)}
                className="dock-item-btn p-3 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-200 focus-neon"
                aria-label={`Navigate to ${item.label}`}
                style={{
                  width: isTouch ? "42px" : `${scale * 42}px`,
                  height: isTouch ? "42px" : `${scale * 42}px`,
                  backgroundColor: isActive ? `rgba(${theme === "spider-blue" ? "0, 85, 255" : theme === "cyber-neon" ? "188, 0, 221" : "255, 0, 60"}, 0.15)` : "rgba(255, 255, 255, 0.03)",
                  border: isActive ? `1.5px solid ${color}` : "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: isActive ? `0 0 10px ${color}33` : "none",
                  transformOrigin: "bottom center",
                }}
              >
                <Icon 
                  style={{ 
                    fontSize: isTouch ? "18px" : `${scale * 16}px`,
                    color: isActive ? color : ""
                  }} 
                  className="transition-colors duration-200" 
                />
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default iOSDock;
