import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiMoon, FiSun, FiActivity } from "react-icons/fi";
import SpiderSense from "./SpiderSense";

const navItems = [
  { id: "hero", label: "Home", icon: FiHome },
  { id: "about", label: "About", icon: FiUser },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "projects", label: "Projects", icon: FiBriefcase },
  { id: "contact", label: "Contact", icon: FiMail },
];

const DynamicIsland = ({ activeSection = "hero" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, setTheme } = useTheme();

  // Scroll monitoring for compact indicators
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.round((window.scrollY / totalHeight) * 100);
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const getThemeName = () => {
    if (theme === "spider-red") return "Spider Red";
    if (theme === "spider-blue") return "Spider Blue";
    return "Cyber Neon";
  };

  const color = getThemeColor();

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsExpanded(false);
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.div
        layout
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        className="pointer-events-auto cursor-pointer glass-card glass-card-glow rounded-[32px] overflow-hidden flex flex-col items-center justify-center p-2 text-sm select-none"
        style={{
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 0 10px ${isExpanded ? color + "22" : "transparent"}`,
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        aria-expanded={isExpanded}
        aria-label="iOS Status Island Navigation"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Collapsed Pill State */
            <motion.div
              key="collapsed"
              layoutId="island-content"
              className="flex items-center gap-4 px-4 py-1.5 h-9 min-w-[210px] justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Dynamic status island items */}
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[11px] font-mono text-slate-400 capitalize tracking-wider font-semibold">
                  {activeSection === "hero" ? "Active" : activeSection}
                </span>
              </div>

              {/* iOS style Island Sensor Pill divider */}
              <div className="w-10 h-3.5 bg-black/60 rounded-full flex items-center justify-center border border-white/5">
                <FiActivity className="text-[8px]" style={{ color: color }} />
              </div>

              <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400 font-bold">
                <span>{scrollProgress}%</span>
              </div>
            </motion.div>
          ) : (
            /* Expanded Dashboard Menu State */
            <motion.div
              key="expanded"
              layoutId="island-content"
              className="p-3 w-[340px] md:w-[460px] flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()} // stop toggle collapse on clicking inside
            >
              {/* Top Dashboard Banner */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <span>Neural Island Controls</span>
                <span style={{ color: color }}>{getThemeName()}</span>
              </div>

              {/* Navigation icons row */}
              <nav className="flex items-center justify-around gap-1" aria-label="Dynamic Island Links">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="relative p-2.5 rounded-full flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors duration-200 focus-neon"
                      aria-label={`Scroll to ${item.label}`}
                    >
                      <Icon className="text-lg z-10" style={{ color: isActive ? color : "" }} />
                      <span className="text-[9px] font-medium tracking-wide z-10 hidden md:block">
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="active-island-indicator"
                          className="absolute inset-0 bg-white/5 rounded-2xl border -z-0"
                          style={{ borderColor: `${color}44` }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Quick switcher inside navigation */}
              <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-2xl p-2 mt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase pl-1.5">Themes</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTheme("spider-red")}
                    className={`h-5 px-2 rounded-full text-[9px] font-mono border transition-all ${
                      theme === "spider-red"
                        ? "bg-[#ff003c]/20 border-[#ff003c] text-white"
                        : "border-white/5 text-slate-400"
                    }`}
                  >
                    Red
                  </button>
                  <button
                    onClick={() => setTheme("spider-blue")}
                    className={`h-5 px-2 rounded-full text-[9px] font-mono border transition-all ${
                      theme === "spider-blue"
                        ? "bg-[#0055ff]/20 border-[#0055ff] text-white"
                        : "border-white/5 text-slate-400"
                    }`}
                  >
                    Blue
                  </button>
                  <button
                    onClick={() => setTheme("cyber-neon")}
                    className={`h-5 px-2 rounded-full text-[9px] font-mono border transition-all ${
                      theme === "cyber-neon"
                        ? "bg-[#bc00dd]/20 border-[#bc00dd] text-white"
                        : "border-white/5 text-slate-400"
                    }`}
                  >
                    Cyber
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DynamicIsland;
