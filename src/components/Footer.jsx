import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiArrowUp } from "react-icons/fi";
import SpiderSense from "./SpiderSense";

const socialLinks = [
  { id: "github", label: "GitHub", icon: FiGithub, url: "https://github.com" },
  { id: "linkedin", label: "LinkedIn", icon: FiLinkedin, url: "https://linkedin.com" },
  { id: "twitter", label: "Twitter", icon: FiTwitter, url: "https://twitter.com" },
  { id: "instagram", label: "Instagram", icon: FiInstagram, url: "https://instagram.com" },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme } = useTheme();

  // Scroll detection to toggle Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
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

  const color = getThemeColor();

  const handleScrollToTop = () => {
    const element = document.getElementById("hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full border-t border-white/5 py-12 px-4 flex flex-col items-center justify-center select-none bg-black/20">
      {/* Footer contents */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        
        {/* Left Side: Copyright */}
        <div className="text-center md:text-left select-text">
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">
            System Terminal Out
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Khayran Ald Afasy. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-600 mt-1 font-mono">
            Designed for web accessibility & mobile acceleration.
          </p>
        </div>

        {/* Right Side: Social links row */}
        <div className="flex gap-4" aria-label="Social Profiles">
          {socialLinks.map((social) => {
            const SocialIcon = social.icon;
            return (
              <SpiderSense key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-all focus-neon"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                  aria-label={`Visit ${social.label} profile`}
                  onFocus={(e) => {
                    e.target.style.borderColor = color;
                    e.target.style.boxShadow = `0 0 10px ${color}33`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.05)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <SocialIcon className="text-base" />
                </a>
              </SpiderSense>
            );
          })}
        </div>
      </div>

      {/* Floating Back to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-40 pointer-events-none"
          >
            <SpiderSense className="pointer-events-auto">
              <button
                onClick={handleScrollToTop}
                className="h-11 w-11 rounded-full flex items-center justify-center text-white border transition-all duration-300 focus-neon"
                style={{
                  backgroundColor: `${color}15`,
                  borderColor: color,
                  boxShadow: `0 4px 12px rgba(0,0,0,0.5), 0 0 15px ${color}22`,
                }}
                aria-label="Scroll back to top"
              >
                <FiArrowUp className="text-base" />
              </button>
            </SpiderSense>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
