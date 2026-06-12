import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Preloader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { theme } = useTheme();

  const loadingMessages = [
    "Initializing Neural Web...",
    "Loading Portfolio Systems...",
    "Connecting Spider Network...",
    "Activating Cyber Interface...",
    "Welcome Khayran Ald Afasy..."
  ];

  // Colors based on theme
  const getColors = () => {
    switch (theme) {
      case "spider-blue":
        return { primary: "#0055ff", shadow: "rgba(0, 85, 255, 0.6)" };
      case "cyber-neon":
        return { primary: "#bc00dd", shadow: "rgba(188, 0, 221, 0.6)" };
      case "spider-red":
      default:
        return { primary: "#ff003c", shadow: "rgba(255, 0, 60, 0.6)" };
    }
  };

  const colors = getColors();

  useEffect(() => {
    if (currentStep < loadingMessages.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 700); // Step duration
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // Pause on last message
      return () => clearTimeout(timer);
    }
  }, [currentStep, loadingMessages.length, onComplete]);

  // Disable body scroll when loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#010206] px-4 select-none"
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Glitchy dark grid background in preloader */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* Cyber/Spider logo wrapper */}
      <div className="relative mb-10">
        {/* Radar Ring pulse */}
        <div 
          className="absolute inset-0 -m-8 rounded-full border border-dashed opacity-25 animate-spin"
          style={{ 
            borderColor: colors.primary, 
            animationDuration: "20s",
            boxShadow: `0 0 15px ${colors.shadow}` 
          }}
        />

        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial="hidden"
          animate="visible"
        >
          {/* Detailed SVG Spider Logo contour drawing */}
          <motion.path
            d="M 50 10 C 50 10 52 28 50 40 C 48 28 50 10 50 10"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Main Spider Body & Head */}
          <motion.path
            d="M 50 35 C 44 35 39 42 39 52 C 39 65 44 75 50 75 C 56 75 61 65 61 52 C 61 42 56 35 50 35 Z"
            stroke={colors.primary}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, fill: "rgba(0,0,0,0.4)" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M 50 25 C 47 25 45 28 45 31 C 45 34 47 35 50 35 C 53 35 55 34 55 31 C 55 28 53 25 50 25 Z"
            stroke={colors.primary}
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />

          {/* Left Legs */}
          {/* Leg 1 */}
          <motion.path
            d="M 40 45 C 25 35 15 45 12 60"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.5 }}
          />
          {/* Leg 2 */}
          <motion.path
            d="M 39 50 C 20 45 10 55 8 72"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.6 }}
          />
          {/* Leg 3 */}
          <motion.path
            d="M 40 58 C 22 60 12 72 10 85"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.7 }}
          />
          {/* Leg 4 */}
          <motion.path
            d="M 42 66 C 26 72 18 85 18 92"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.8 }}
          />

          {/* Right Legs */}
          {/* Leg 1 */}
          <motion.path
            d="M 60 45 C 75 35 85 45 88 60"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.5 }}
          />
          {/* Leg 2 */}
          <motion.path
            d="M 61 50 C 80 45 90 55 92 72"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.6 }}
          />
          {/* Leg 3 */}
          <motion.path
            d="M 60 58 C 78 60 88 72 90 85"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.7 }}
          />
          {/* Leg 4 */}
          <motion.path
            d="M 58 66 C 74 72 82 85 82 92"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.8 }}
          />
        </motion.svg>
      </div>

      {/* Cyber logs output console */}
      <div 
        className="w-full max-w-sm rounded-lg glass-card p-5 border-l-2 font-mono text-xs shadow-lg relative overflow-hidden"
        style={{ borderLeftColor: colors.primary }}
      >
        {/* Glow behind logs */}
        <div 
          className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full filter blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: colors.primary }}
        />

        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-[10px] text-slate-500 uppercase tracking-widest">
          <span>Boot Console v26.04</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            ONLINE
          </span>
        </div>

        <div className="space-y-1.5 min-h-[100px] select-text">
          {loadingMessages.slice(0, currentStep).map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-[10px]" style={{ color: colors.primary }}>&gt;&gt;</span>
              <span className={idx === loadingMessages.length - 1 ? "text-slate-100 font-bold" : "text-slate-400"}>
                {msg}
              </span>
            </motion.div>
          ))}
          {currentStep < loadingMessages.length && (
            <div className="flex items-center gap-1 text-[10px]" style={{ color: colors.primary }}>
              <span>&gt;&gt;</span>
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>

        {/* Loading Progress percentage bar */}
        <div className="mt-4 bg-white/5 rounded-full h-1 relative overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ 
              backgroundColor: colors.primary,
              boxShadow: `0 0 8px ${colors.primary}`
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / loadingMessages.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
