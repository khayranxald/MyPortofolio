import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiExternalLink, FiGithub, FiMaximize2 } from "react-icons/fi";
import SpiderSense from "./SpiderSense";
import ProjectModal from "./ProjectModal";

const projectsList = [
  {
    id: 1,
    title: "Semua project di privasi",
    description: "Realtime data visualizer with dynamic web network nodes and custom Canvas monitoring loops.",
    details: "A premium monitoring panel rendering system telemetry. Built to display active server nodes using high-performance HTML5 Canvas lines. Integrates a custom theme-state matrix and low-latency network indicators.",
    tech: ["React", "Vite", "Tailwind CSS", "Canvas"],
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Dynamic OS Interface",
    description: "Futuristic web operating system simulation displaying Dynamic Island controls and macOS docks.",
    details: "A high-fidelity layout sandbox imitating modern apple system components. Includes fluid spring-physics widgets, bottom magnifying icons, file browser modals, and fully theme-integrated utility widgets.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Cyberpunk E-Commerce",
    description: "Storefront layout showing interactive neon product cards, fast filter tools, and cart animations.",
    details: "An ultra-premium storefront mockup optimized for gaming and sci-fi accessories. Utilizes GSAP for smooth scroll-bound product transitions and hardware-accelerated grid overlays.",
    tech: ["Next.js", "GSAP", "Tailwind CSS", "Redux"],
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Vibe Stream Visualizer",
    description: "Audio player application integrated with Canvas waves rendering active frequencies.",
    details: "A sleek audio client capturing microphone and sound telemetry. Maps active decibel bands onto a glowing neon canvas layout, delivering real-time rhythmic node animations.",
    tech: ["React", "Web Audio API", "Canvas", "Firebase"],
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 5,
    title: "Neuro Notes Workspace",
    description: "Offline markdown writer featuring keyboard-shortcut macros and reactive notes list.",
    details: "A distraction-free coder journal supporting full keyboard layouts. Integrates dynamic content schemas, code blocks syntax highlighting, and local cache backups for reliable note logging.",
    tech: ["React", "Tailwind CSS", "LocalForage", "Git"],
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 6,
    title: "Cyber Kanban Board",
    description: "Project management kanban table utilizing drag and drop layouts and progress tags.",
    details: "A glowing scheduling tool configured for developer groups. Implements drag handle structures, checklist milestones, priority indicators, and transition micro-effects.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    live: "https://example.com",
    github: "https://github.com",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const { theme } = useTheme();

  // Touch screen flag check
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

  // 3D Tilt Hook Logic for single cards
  const handleMouseMove = (e, cardId) => {
    if (isTouch) return;
    const card = document.getElementById(`project-card-${cardId}`);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside element
    const y = e.clientY - rect.top;  // y position inside element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rotate values range: -10deg to 10deg
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move glow spotlight reflection
    const glow = card.querySelector(".card-spotlight");
    if (glow) {
      glow.style.background = `radial-gradient(150px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08) 0%, transparent 80%)`;
    }
  };

  const handleMouseLeave = (cardId) => {
    if (isTouch) return;
    const card = document.getElementById(`project-card-${cardId}`);
    if (!card) return;

    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    const glow = card.querySelector(".card-spotlight");
    if (glow) {
      glow.style.background = "transparent";
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-28 px-4 flex flex-col items-center justify-center select-none"
    >
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Compiled Works
        </span>
        <h2
          className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1 text-glow"
          style={{ "--color-glow": `${color}33` }}
        >
          My Projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {projectsList.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.1 }}
            className="w-full flex"
          >
            {/* Interactive Card wrapper */}
            <div
              id={`project-card-${project.id}`}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              className="w-full rounded-3xl glass-card border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-200 cursor-pointer shadow-lg group select-none"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* Card Cursor Spotlight Reflection (Desktop only) */}
              {!isTouch && (
                <div className="card-spotlight absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-100" />
              )}

              {/* Dynamic corner index widget */}
              <div className="absolute top-4 right-4 font-mono text-[8px] text-slate-500 uppercase">
                BUILD_00{project.id}
              </div>

              {/* Card Core Content */}
              <div>
                {/* Visual Thumbnail simulation */}
                <div
                  className="w-full h-36 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden flex items-center justify-center mb-5 group-hover:border-white/10 transition-colors"
                >
                  <div className="absolute inset-0 grid-overlay opacity-25" />
                  <div
                    className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center animate-spin"
                    style={{ borderColor: `${color}22`, animationDuration: "16s" }}
                  />
                  {/* Floating code tags */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between font-mono text-[8px] text-slate-500">
                    <span>STATUS: ONLINE</span>
                    <span>MD_SYS_V</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-200 group-hover:text-glow group-hover:text-white transition-all mb-2" style={{ "--color-glow": `${color}33` }}>
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-5 select-text">
                  {project.description}
                </p>
              </div>

              {/* Tech stack & Links footer */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 pointer-events-none">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-slate-500">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Button panel */}
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2 px-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[10px] font-mono font-bold tracking-widest text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors focus-neon"
                    aria-label={`View details of ${project.title}`}
                  >
                    <FiMaximize2 className="text-xs" />
                    DETAILS
                  </button>
                  <SpiderSense>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl text-[10px] font-mono font-bold tracking-widest text-white border transition-all duration-300 flex items-center justify-center gap-1.5 focus-neon"
                      style={{
                        backgroundColor: `${color}10`,
                        borderColor: color,
                        boxShadow: `0 0 10px ${color}11`,
                      }}
                    >
                      <FiExternalLink className="text-xs" />
                      LIVE
                    </a>
                  </SpiderSense>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
