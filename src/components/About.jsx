import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiCpu, FiAward, FiCode, FiLayers } from "react-icons/fi";
import SpiderSense from "./SpiderSense";

const milestones = [
  {
    year: "2026",
    title: "Senior Creative Frontend Developer",
    subtitle: "Lead UI & Web Animation",
    description: "Designing high-fidelity, AAA-quality web designs blending Marvel, Apple, and Cyberpunk aesthetics with Framer Motion and WebGL.",
    icon: FiCpu,
  },
  {
    year: "2025",
    title: "Creative Web Designer & Developer",
    subtitle: "Freelancer & UI Engineer",
    description: "Built pixel-perfect, glassmorphic layout models, leading performance audits and securing fluid web transition systems.",
    icon: FiLayers,
  },
  {
    year: "2024",
    title: "Fullstack Engineering Foundations",
    subtitle: "React & Cloud Infrastructure",
    description: "Crafted core architectures with React, Next.js, and Firebase databases, setting high standards for responsive UI.",
    icon: FiCode,
  },
];

const About = () => {
  const { theme } = useTheme();

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

  // Scroll animations variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.15,
      },
    }),
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-28 px-4 flex flex-col items-center justify-center select-none"
    >
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Profile Database
        </span>
        <h2
          className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1 text-glow"
          style={{ "--color-glow": `${color}33` }}
        >
          About Me
        </h2>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Bio Card (5 columns) */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
          className="md:col-span-5 rounded-3xl glass-card glass-card-glow p-6 md:p-8 border border-white/5 shadow-xl relative"
        >
          {/* Inner card glow element */}
          <div
            className="absolute -left-10 -top-10 w-32 h-32 rounded-full filter blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: color }}
          />

          <div className="flex items-center gap-1 font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-4">
            <FiAward className="text-xs" style={{ color }} />
            Core BIO DATA
          </div>

          <h3 className="text-xl font-bold text-slate-100 mb-4 select-text">
            Hello, I'm Khayran Ald Afasy.
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed space-y-4 select-text">
            Saya adalah pengembang web yang berfokus pada pembuatan antarmuka modern, responsif, dan interaktif. Dengan ketertarikan pada React, Next.js, serta teknologi frontend modern, saya senang menciptakan pengalaman digital yang menggabungkan performa, estetika, dan inovasi.
            <br /><br />
            Terinspirasi oleh desain futuristik, ekosistem Apple, dan visual sinematik, saya percaya bahwa sebuah website tidak hanya harus berfungsi dengan baik, tetapi juga mampu memberikan pengalaman yang menarik dan berkesan bagi setiap pengguna.
          </p>
        </motion.div>

        {/* Right Side: Milestones Timeline (7 columns) */}
        <div className="md:col-span-7 flex flex-col gap-6 relative">
          {/* Center timeline connector wire */}
          <div
            className="absolute left-6 top-8 bottom-8 w-0.5 opacity-10 pointer-events-none"
            style={{ backgroundColor: color }}
          />

          {milestones.map((milestone, idx) => {
            const MilestoneIcon = milestone.icon;
            return (
              <motion.div
                key={idx}
                custom={idx + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                className="flex gap-4 items-start relative pl-1"
              >
                {/* Timeline Node Symbol */}
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center glass-card border z-10 shrink-0 select-none shadow-md"
                  style={{
                    borderColor: `${color}44`,
                    boxShadow: `0 0 10px ${color}15`
                  }}
                >
                  <MilestoneIcon className="text-sm" style={{ color }} />
                </div>

                {/* Milestone Detail Card */}
                <div className="flex-1 rounded-2xl glass-card glass-card-glow p-5 md:p-6 border border-white/5 relative">
                  {/* Floating Year badge */}
                  <span
                    className="absolute top-5 right-5 font-mono text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full border"
                    style={{
                      color: color,
                      borderColor: `${color}33`,
                      backgroundColor: `${color}08`
                    }}
                  >
                    {milestone.year}
                  </span>

                  <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block mb-1">
                    {milestone.subtitle}
                  </span>

                  <h4 className="text-base font-bold text-slate-200 mb-2 select-text">
                    {milestone.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed select-text">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
