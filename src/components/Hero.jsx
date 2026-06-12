import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiArrowDown, FiActivity, FiLayers, FiCpu, FiCompass } from "react-icons/fi";
import SpiderSense from "./SpiderSense";

const titles = [
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Creative Web Designer",
];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [isExploreHovered, setIsExploreHovered] = useState(false);
  const [isTalkHovered, setIsTalkHovered] = useState(false);
  const { theme } = useTheme();

  // Dynamic interval for rotating titles
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getColors = () => {
    switch (theme) {
      case "spider-blue":
        return { primary: "#0055ff", secondary: "#ff003c" };
      case "cyber-neon":
        return { primary: "#bc00dd", secondary: "#00ffaa" };
      case "spider-red":
      default:
        return { primary: "#ff003c", secondary: "#00f0ff" };
    }
  };

  const colors = getColors();

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 xl:px-20 select-none pt-28 pb-16 overflow-hidden"
    >
      {/* Spider-Verse HUD element grids behind Hero */}
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />

      {/* Floating neon ambient blobs for atmospheric lighting */}
      <div 
        className="absolute top-1/4 left-[10%] w-[350px] h-[350px] rounded-full filter blur-[150px] opacity-10 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: colors.primary }}
      />
      <div 
        className="absolute bottom-1/3 right-[15%] w-[400px] h-[400px] rounded-full filter blur-[160px] opacity-[0.08] pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: colors.secondary }}
      />

      {/* Asymmetrical 2-Column Grid Layout */}
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Oversized Typography & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
        >
          {/* Oversized typography with animated gradient styling */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-slate-100">
            <span className="block mb-2">KHAYRAN</span>
            <span 
              className="block animate-text-gradient bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
              }}
            >
              ALD AFASY
            </span>
          </h1>

          {/* Smooth slide-and-fade subtitle carousel */}
          <div className="h-10 md:h-12 overflow-hidden mb-6 flex items-center justify-center lg:justify-start w-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ y: 22, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -22, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-3xl font-mono font-bold tracking-wide"
                style={{ color: colors.secondary }}
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-slate-400 font-sans text-sm md:text-base max-w-lg mb-8 leading-relaxed">
            Crafting premium interactive interfaces and high-performance digital environments. 
            Blending Apple design philosophies with futuristic front-end engineering.
          </p>

          {/* Redesigned Pill Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start items-center">
            <SpiderSense>
              <button
                onClick={handleScrollToProjects}
                onMouseEnter={() => setIsExploreHovered(true)}
                onMouseLeave={() => setIsExploreHovered(false)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-widest text-white border transition-all duration-300 active:scale-95 bg-white/5 backdrop-blur-md cursor-pointer"
                style={{
                  borderColor: isExploreHovered ? colors.primary : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isExploreHovered ? `0 0 25px ${colors.primary}33` : "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                  transform: isExploreHovered ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                EXPLORE_PROJECTS
              </button>
            </SpiderSense>

            <SpiderSense>
              <button
                onClick={handleScrollToContact}
                onMouseEnter={() => setIsTalkHovered(true)}
                onMouseLeave={() => setIsTalkHovered(false)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-widest text-slate-300 hover:text-white border transition-all duration-300 active:scale-95 bg-white/5 backdrop-blur-md cursor-pointer"
                style={{
                  borderColor: isTalkHovered ? colors.secondary : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isTalkHovered ? `0 0 25px ${colors.secondary}33` : "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                  transform: isTalkHovered ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                LET'S_TALK
              </button>
            </SpiderSense>
          </div>
        </motion.div>

        {/* Right Column: Floating VisionOS Holographic Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full flex justify-center items-center min-h-[420px] lg:min-h-[500px]"
        >
          {/* Holographic HUD grid lines (Background) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-white/5 flex items-center justify-center pointer-events-none opacity-20"
            style={{
              boxShadow: `inset 0 0 40px ${colors.primary}08`,
            }}
          >
            <svg className="w-full h-full p-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 2" className="text-slate-500" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.1" className="text-slate-500" />
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.1" strokeDasharray="4 4" className="text-slate-500" />
              <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="0.1" className="text-slate-500" />
              <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.1" className="text-slate-500" />
              <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.1" className="text-slate-500" />
              <line x1="16" y1="16" x2="84" y2="84" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" className="text-slate-500" />
              <line x1="84" y1="16" x2="16" y2="84" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" className="text-slate-500" />
            </svg>
          </motion.div>

          {/* Widget 1: System Info Widget (Floating top-left) */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              x: [0, 8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="visionos-glass visionos-glass-hover p-4 rounded-[24px] absolute top-4 left-2 sm:left-6 md:left-12 z-20 flex items-center gap-3"
          >
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FiCpu className="text-sm" style={{ color: colors.primary }} />
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Neural Link</span>
              <span className="text-[11px] font-bold text-slate-200 font-mono tracking-wider">PORT_80_OK</span>
            </div>
          </motion.div>

          {/* Widget 2: Biometric Scanner Card (Center interactive widget) */}
          <motion.div
            animate={{
              y: [0, 8, 0],
              x: [0, -6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="visionos-glass visionos-glass-hover p-6 rounded-[32px] w-64 md:w-72 absolute z-10 flex flex-col relative overflow-hidden"
          >
            {/* Holographic scan line animation */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] pointer-events-none opacity-40 z-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)`,
                boxShadow: `0 0 8px ${colors.secondary}`,
              }}
            />

            {/* Subtle high-tech spider emblem background overlay */}
            <div className="absolute -bottom-6 -right-6 w-28 h-28 opacity-[0.03] pointer-events-none text-white">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="10" strokeWidth="1" />
                <circle cx="50" cy="50" r="25" strokeWidth="1" />
                <circle cx="50" cy="50" r="40" strokeWidth="1" />
                <line x1="10" y1="10" x2="90" y2="90" strokeWidth="1" />
                <line x1="90" y1="10" x2="10" y2="90" strokeWidth="1" />
              </svg>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">IDENTITY</span>
                <span className="text-sm font-bold text-white font-mono tracking-wide">SECURE_INDEX</span>
              </div>
              <span className="text-[8px] font-mono border px-2 py-0.5 rounded-full uppercase" style={{ borderColor: `${colors.primary}55`, color: colors.primary }}>
                VOS_v26.4
              </span>
            </div>

            <div className="flex items-center gap-4 border-t border-b border-white/5 py-4 my-2">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-slate-300 font-bold">K_ALD_AFASY</span>
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wide">Authorized Core</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 font-mono text-[9px] text-slate-400">
              <span>LOC: SEC_A</span>
              <span style={{ color: colors.secondary }}>BIOMETRIC_OK</span>
            </div>
          </motion.div>

          {/* Widget 3: Tech Arsenal Capsule (Floating center-right) */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, -8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="visionos-glass visionos-glass-hover p-4 rounded-[24px] absolute bottom-24 right-4 sm:right-8 lg:-right-4 z-20 flex flex-col gap-2 min-w-[170px]"
          >
            <div className="flex items-center gap-2">
              <FiLayers className="text-xs" style={{ color: colors.secondary }} />
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Stack Spec</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300">REACT</span>
              <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300">VITE</span>
              <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300">FRAMER</span>
            </div>
          </motion.div>

          {/* Widget 4: Availability Capsule (Floating bottom-left) */}
          <motion.div
            animate={{
              y: [0, 14, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="visionos-glass visionos-glass-hover p-3.5 rounded-[22px] absolute bottom-6 left-4 sm:left-12 z-20 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">CONTRACTS</span>
              <span className="text-[10px] font-bold text-slate-200 font-mono tracking-wider mt-0.5">AVAIL_FOR_HIRE</span>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Bounce scroll down arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        onClick={handleScrollToProjects}
        className="absolute bottom-10 p-3 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white cursor-pointer select-none transition-colors z-10 hover:bg-white/10"
        aria-label="Scroll down to projects"
        role="button"
      >
        <FiArrowDown className="text-lg" />
      </motion.div>
    </section>
  );
};

export default Hero;

