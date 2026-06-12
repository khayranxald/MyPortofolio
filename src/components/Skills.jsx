import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub 
} from "react-icons/fa";
import { 
  SiNextdotjs, SiTailwindcss, SiFirebase 
} from "react-icons/si";

const motionElement = motion;

const skillsData = [
  { name: "HTML", level: 95, icon: FaHtml5, floatSpeed: "animate-float-slow" },
  { name: "CSS", level: 90, icon: FaCss3Alt, floatSpeed: "animate-float-medium" },
  { name: "JavaScript", level: 90, icon: FaJs, floatSpeed: "animate-float-slow" },
  { name: "React", level: 95, icon: FaReact, floatSpeed: "animate-float-medium" },
  { name: "Next.js", level: 85, icon: SiNextdotjs, floatSpeed: "animate-float-slow" },
  { name: "Tailwind CSS", level: 95, icon: SiTailwindcss, floatSpeed: "animate-float-medium" },
  { name: "Firebase", level: 75, icon: SiFirebase, floatSpeed: "animate-float-slow" },
  { name: "Git", level: 85, icon: FaGitAlt, floatSpeed: "animate-float-medium" },
  { name: "GitHub", level: 90, icon: FaGithub, floatSpeed: "animate-float-slow" },
];

const Skills = () => {
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
  
  // Circular ring specs
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23

  return (
    <section 
      id="skills" 
      className="relative min-h-screen w-full py-28 px-4 flex flex-col items-center justify-center select-none"
    >
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Neural Interface Capabilities
        </span>
        <h2 
          className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1 text-glow"
          style={{ "--color-glow": `${color}33` }}
        >
          My Skills
        </h2>
      </div>

      {/* Skills floating cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {skillsData.map((skill, index) => {
          const SkillIcon = skill.icon;
          
          return (
            <motionElement.div
              key={skill.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
              // Applies organic floating cycles
              className={`${skill.floatSpeed} w-full`}
            >
              {/* Outer Interactive glass container */}
              <motionElement.div
                whileHover={{ 
                  scale: 1.04, 
                  y: -5,
                  boxShadow: `0 12px 30px rgba(0,0,0,0.5), 0 0 20px ${color}33`,
                  borderColor: color,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full h-40 rounded-3xl glass-card p-5 border border-white/5 flex flex-col justify-between relative overflow-hidden group select-none cursor-pointer"
                style={{
                  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.25)`,
                }}
              >
                {/* Micro corner network dot */}
                <div className="absolute top-3 right-3 font-mono text-[8px] text-slate-500 tracking-wider">
                  SYS_MOD_{index + 10}
                </div>

                <div className="flex justify-between items-start">
                  {/* Skill Icon */}
                  <div 
                    className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: `rgba(255,255,255,0.05)`,
                    }}
                  >
                    <SkillIcon className="text-2xl transition-colors duration-300 group-hover:text-white text-slate-400" />
                  </div>

                  {/* Circular neon SVG progress ring */}
                  <div className="relative h-12 w-12 flex items-center justify-center select-none pointer-events-none">
                    <svg className="h-full w-full -rotate-90">
                      {/* Background track circle */}
                      <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        className="stroke-white/5"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      {/* Interactive fill circle */}
                      <motionElement.circle
                        cx="24"
                        cy="24"
                        r={radius}
                        stroke={color}
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{
                          strokeDashoffset: circumference - (skill.level / 100) * circumference,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                        style={{
                          filter: `drop-shadow(0 0 4px ${color})`,
                        }}
                      />
                    </svg>
                    {/* Centered percentage display */}
                    <span className="absolute font-mono text-[9px] font-bold text-slate-300 group-hover:text-white">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Skill Name */}
                <div className="mt-4 select-text">
                  <h3 className="text-base font-bold text-slate-300 group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <div className="w-6 h-0.5 mt-1.5 rounded-full bg-white/10 group-hover:w-12 transition-all duration-300" style={{
                    backgroundColor: `rgba(255,255,255,0.1)`,
                  }} />
                </div>
              </motionElement.div>
            </motionElement.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
