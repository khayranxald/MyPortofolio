import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  const loadingMessages = [
    "Preparing Experience",
    "Crafting Interactive Interface",
    "Initializing Portfolio",
    "Almost Ready"
  ];

  // Colors based on theme
  const getColors = () => {
    switch (theme) {
      case "spider-blue":
        return {
          primary: "#0055ff",
          secondary: "#ff003c",
          shadow: "rgba(0, 85, 255, 0.4)",
          glow: "rgba(0, 85, 255, 0.2)"
        };
      case "cyber-neon":
        return {
          primary: "#bc00dd",
          secondary: "#00ffaa",
          shadow: "rgba(188, 0, 221, 0.4)",
          glow: "rgba(188, 0, 221, 0.2)"
        };
      case "spider-red":
      default:
        return {
          primary: "#ff003c",
          secondary: "#00f0ff",
          shadow: "rgba(255, 0, 60, 0.4)",
          glow: "rgba(255, 0, 60, 0.2)"
        };
    }
  };

  const colors = getColors();

  // Mouse move listener for background parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Time loop for smooth floating calculations
  useEffect(() => {
    let animationFrame;
    const start = performance.now();
    const tick = (now) => {
      setTime((now - start) / 1000);
      animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Organic progress loading simulation
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (isExiting) return;

      let increment = 0;
      if (currentProgress < 30) {
        increment = Math.random() * 2 + 1.2;
      } else if (currentProgress < 65) {
        increment = Math.random() * 1.2 + 0.4; // slow down
      } else if (currentProgress < 90) {
        increment = Math.random() * 3.5 + 1.5; // sprint
      } else {
        increment = 0.5; // final crawl
      }

      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsExiting(true);
        const timer = setTimeout(() => {
          onComplete();
        }, 900); // Wait for climbing & dissolve exit animation
        return () => clearTimeout(timer);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isExiting, onComplete]);

  // Disable scroll when preloader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Map progress to active status message
  let messageIndex = 0;
  if (progress < 25) messageIndex = 0;
  else if (progress < 60) messageIndex = 1;
  else if (progress < 85) messageIndex = 2;
  else messageIndex = 3;
  const currentMessage = loadingMessages[messageIndex];

  // Animation values calculations
  const isDescending = progress <= 35;
  const descentRatio = isDescending ? progress / 35 : 1;

  // Web thread properties
  const threadLength = isExiting ? 50 : (isDescending ? descentRatio * 50 : 50); // vh units
  const threadOpacity = isExiting ? 1 : (isDescending ? 1 : Math.max(0, 1 - (progress - 35) / 10));

  // Physics-based swing coordinates during descent, floating idle afterwards
  const pendulumRotation = isExiting ? 0 : (isDescending ? Math.sin(progress * 0.45) * 8 * (1 - descentRatio) : 0);
  const spiderSelfRotation = isExiting ? 0 : (isDescending ? Math.sin(progress * 0.9) * 12 * (1 - descentRatio) : Math.sin(time * 1.5) * 2.5);

  const floatY = isExiting ? 0 : (isDescending ? 0 : Math.sin(time * 3.5) * 4);
  const swayX = isExiting ? 0 : (isDescending ? 0 : Math.cos(time * 2.0) * 2);

  // Orb properties
  const orbScaleRatio = isDescending ? 0 : Math.min(1, (progress - 35) / 15);
  // Cubic ease out
  const orbScale = isExiting ? 1.3 : (isDescending ? 0 : 1 - Math.pow(1 - orbScaleRatio, 3));

  // Circular progress calculations (Radius = 96, Center = 105)
  const ringProgress = isDescending ? 0 : ((progress - 35) / 65) * 100;
  const r = 96;
  const cx = 105;
  const cy = 105;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (ringProgress / 100) * circumference;

  const angle = (ringProgress / 100) * 360 - 90;
  const rad = (angle * Math.PI) / 180;
  const particleX = cx + r * Math.cos(rad);
  const particleY = cy + r * Math.sin(rad);

  // Generate static random positions for floating stars/particles once
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.8,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * -16,
    }))
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center bg-[#050816] px-4 select-none overflow-hidden"
      exit={{
        opacity: 0,
        filter: "blur(30px)",
        transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {/* Background Ambient Blobs with Parallax */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -50, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, ${colors.primary}16 0%, transparent 70%)`,
          filter: "blur(120px)",
          transform: `translate(${mousePos.x * 45}px, ${mousePos.y * 45}px)`,
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, ${colors.secondary}12 0%, transparent 70%)`,
          filter: "blur(120px)",
          transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`,
        }}
      />

      {/* Elegant SVG Abstract Web Lines with Parallax */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 transition-transform duration-300 ease-out" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
        }}
      >
        <motion.path
          d="M -100 -100 Q 300 400 1200 -100"
          fill="none"
          stroke={colors.primary}
          strokeWidth="0.5"
          opacity="0.08"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M -50 800 Q 500 400 1300 900"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="0.5"
          opacity="0.06"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M 200 -200 Q 800 500 200 1200"
          fill="none"
          stroke={colors.primary}
          strokeWidth="0.5"
          opacity="0.07"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, ease: "easeInOut", delay: 0.1 }}
        />
      </svg>

      {/* Floating Spark Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.6)",
            }}
            animate={{
              y: [0, -1000],
              x: [0, Math.sin(p.id) * 30],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Central Glass Orb and Progress Ring Base Container */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 5 }}
      >
        {/* Progress Circular Arc Ring */}
        <motion.svg
          width="210"
          height="210"
          viewBox="0 0 210 210"
          className="absolute z-25 pointer-events-none"
          animate={isExiting ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: progress > 35 ? 1 : 0 }}
          transition={isExiting ? { duration: 0.5 } : { duration: 0.3 }}
        >
          {/* Thin Glass/Faint track background */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Active progress arc */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              filter: `drop-shadow(0 0 4px ${colors.primary}55)`,
            }}
          />
          {/* Orbiting particle */}
          {ringProgress > 0 && ringProgress < 100 && (
            <circle
              cx={particleX}
              cy={particleY}
              r="3.5"
              fill={colors.secondary}
              style={{
                filter: `drop-shadow(0 0 6px ${colors.secondary})`,
              }}
            />
          )}
        </motion.svg>

        {/* Liquid Glass Orb (Frosted glass floating sphere) */}
        <motion.div
          animate={
            isExiting 
              ? { scale: 1.3, opacity: 0, filter: "blur(10px)" } 
              : { scale: orbScale, opacity: progress > 35 ? 1 : 0 }
          }
          transition={isExiting ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] } : { duration: 0.3 }}
          className="relative flex items-center justify-center w-40 h-40 rounded-full border border-white/10 backdrop-blur-3xl bg-white/[0.02] shadow-[0_0_40px_rgba(255,255,255,0.02),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden z-20"
        >
          {/* Glass Gloss Highlights */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/[0.06] to-transparent rounded-full filter blur-[2px] pointer-events-none" />
          
          {/* Soft ambient inner glow */}
          <div
            className="absolute w-20 h-20 rounded-full filter blur-xl opacity-20 pointer-events-none"
            style={{ backgroundColor: colors.primary }}
          />

          {/* Clean percentage indicator inside the glass orb */}
          <motion.span
            className="absolute bottom-5 font-sans text-[10px] tracking-wider text-slate-400 font-semibold select-none font-mono"
            animate={isExiting ? { opacity: 0, scale: 0.9 } : { opacity: progress > 35 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      </div>

      {/* Spider Pendulum & Descent Thread Group */}
      <motion.div
        className="absolute top-0 left-1/2 w-0 flex flex-col items-center pointer-events-none"
        style={{
          transformOrigin: "top center",
          rotate: pendulumRotation,
          zIndex: 30
        }}
      >
        {/* Web Thread Line */}
        <motion.div
          className="w-[1.2px] bg-gradient-to-b from-white/10 to-white/50"
          animate={isExiting ? { height: "0vh", opacity: 1 } : { height: `${threadLength}vh`, opacity: threadOpacity }}
          transition={isExiting ? { duration: 0.65, ease: [0.36, 0.07, 0.19, 0.97] } : { duration: 0.1 }}
          style={{
            boxShadow: "0 0 6px rgba(255,255,255,0.25)",
          }}
        />

        {/* Spider Container */}
        <motion.div
          animate={
            isExiting
              ? { y: "-15vh", opacity: 0 } // climbs back up rapidly
              : { y: floatY, x: swayX, rotate: spiderSelfRotation, opacity: 1 }
          }
          transition={isExiting ? { duration: 0.6, ease: [0.36, 0.07, 0.19, 0.97] } : { duration: 0.1 }}
          style={{
            marginTop: "-2px",
          }}
        >
          {/* Minimal Abstract Spider SVG */}
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <motion.path
              d="M 50 38 C 46 38 43 43 43 51 C 43 59 46 64 50 64 C 54 64 57 59 57 51 C 57 43 54 38 50 38 Z"
              stroke={colors.primary}
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            
            {/* Head */}
            <motion.circle
              cx="50"
              cy="31"
              r="3.5"
              stroke={colors.primary}
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Left Legs */}
            <motion.path
              d="M 44 46 C 35 34 22 36 16 48"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
            />
            <motion.path
              d="M 43 50 C 30 42 18 46 12 60"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
            />
            <motion.path
              d="M 43 54 C 28 52 18 60 14 74"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
            />
            <motion.path
              d="M 44 58 C 32 64 24 76 22 86"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.7 }}
            />

            {/* Right Legs */}
            <motion.path
              d="M 56 46 C 65 34 78 36 84 48"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
            />
            <motion.path
              d="M 57 50 C 70 42 82 46 88 60"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
            />
            <motion.path
              d="M 57 54 C 72 52 82 60 86 74"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
            />
            <motion.path
              d="M 56 58 C 68 64 76 76 78 86"
              stroke={colors.primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.7 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Single Elegant status message */}
      <div 
        className="absolute bottom-20 left-0 right-0 h-10 flex items-center justify-center overflow-hidden z-10"
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentMessage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.3em] font-medium text-slate-300 font-sans uppercase text-center"
            style={{
              textShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
            }}
          >
            {currentMessage}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Preloader;
