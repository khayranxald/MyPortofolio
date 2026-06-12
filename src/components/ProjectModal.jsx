import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiX, FiExternalLink, FiGithub } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import SpiderSense from "./SpiderSense";

const ProjectModal = ({ project, onClose }) => {
  const { theme } = useTheme();
  const modalRef = useRef(null);

  // Keyboard navigation: Close on Escape press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Lock background scroll when modal is open
    document.body.style.overflow = "hidden";

    // Focus the modal container for accessibility
    if (modalRef.current) {
      const closeBtn = modalRef.current.querySelector(".close-btn");
      if (closeBtn) closeBtn.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!project) return null;

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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Card container */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-card glass-card-glow border border-white/10 shadow-2xl z-10 flex flex-col md:flex-row max-h-[85vh] md:max-h-none"
      >
        {/* Neon corner flare */}
        <div 
          className="absolute -right-20 -top-20 w-48 h-48 rounded-full filter blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        {/* Project Thumbnail Image */}
        <div className="w-full md:w-1/2 h-48 md:h-auto bg-slate-900/60 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
          {/* Cyber Spider net web graphic inside image */}
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div 
            className="w-24 h-24 rounded-full border border-dashed flex items-center justify-center animate-spin"
            style={{ borderColor: `${color}44`, animationDuration: "12s" }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
              HUD PREVIEW
            </span>
          </div>

          {/* Glowing tech stats indicator in left panel */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-slate-400 space-y-0.5">
            <div>STATUS: COMPILED</div>
            <div>SYS_TARGET: PROD_DIST</div>
          </div>
        </div>

        {/* Project Details Panel */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          {/* Header Row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                Project File
              </span>
              <button
                onClick={onClose}
                className="close-btn p-1.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors focus-neon"
                aria-label="Close details"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <h3 
              id="modal-title" 
              className="text-2xl font-bold text-slate-100 mb-2 text-glow"
              style={{ "--color-glow": `${color}33` }}
            >
              {project.title}
            </h3>

            {/* Tech Stack pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <span 
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              {project.details || project.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex gap-3 mt-4">
            <SpiderSense className="flex-1">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-mono font-semibold text-white tracking-wider border transition-all duration-300 focus-neon"
                style={{
                  backgroundColor: `${color}15`,
                  borderColor: color,
                  boxShadow: `0 0 10px ${color}22`,
                }}
              >
                <FiExternalLink />
                LIVE DEMO
              </a>
            </SpiderSense>

            <SpiderSense className="flex-1">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-mono font-semibold text-slate-300 hover:text-white tracking-wider border border-white/10 bg-white/5 hover:bg-white/10 transition-all focus-neon"
              >
                <FiGithub />
                SOURCE
              </a>
            </SpiderSense>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
