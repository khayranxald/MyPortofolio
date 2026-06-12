import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useTheme } from "./context/ThemeContext";

// Components
import Preloader from "./components/Preloader";
import BackgroundCity from "./components/BackgroundCity";
import BackgroundWeb from "./components/BackgroundWeb";
import DynamicIsland from "./components/DynamicIsland";
import iOSDock from "./components/iOSDock";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isTouch, setIsTouch] = useState(false);
  const { theme } = useTheme();

  // Touch screen capability checking
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

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoaded]);

  // Global mouse cursor spotlight variable updates (Optimized: Direct CSS vars, no state updates)
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouch]);

  // IntersectionObserver for tracking active sections
  useEffect(() => {
    if (!isLoaded) return;

    const sections = ["hero", "about", "skills", "projects", "contact"];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      // Set threshold depending on section size
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-45% 0px -45% 0px", // triggers when section is centered in screen
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, [isLoaded]);

  return (
    <>
      {/* Preloader sequence */}
      <AnimatePresence>
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {/* Main app wrapper (rendered once booted) */}
      {isLoaded && (
        <div className="relative min-h-screen w-full overflow-x-hidden">
          
          {/* Parallax Cyber City Canvas */}
          <BackgroundCity />
          
          {/* Interactive Spider-Web Connection Canvas */}
          <BackgroundWeb />

          {/* Direct hardware-accelerated spotlight mask following cursor */}
          {!isTouch && <div className="cursor-spotlight" />}

          {/* Dynamic Island status/navigation pill */}
          <DynamicIsland activeSection={activeSection} />

          {/* Page Sections */}
          <main className="relative z-10 w-full flex flex-col items-center">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          {/* Footer details */}
          <Footer />

          {/* macOS-style Bottom magnifying shortcut dock */}
          <iOSDock activeSection={activeSection} />

        </div>
      )}
    </>
  );
}

export default App;
