import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const BackgroundWeb = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Detect device type
    const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                     window.matchMedia("(pointer: coarse)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle settings
    const maxParticles = isMobile ? 25 : 85;
    const connectionDist = isMobile ? 80 : 130;
    const mouseConnectionDist = 200;

    let particles = [];
    const mouse = { x: null, y: null, active: false };

    // Fetch theme colors
    const getColors = () => {
      switch (theme) {
        case "spider-blue":
          return { primary: "0, 85, 255", secondary: "255, 0, 60" };
        case "cyber-neon":
          return { primary: "188, 0, 221", secondary: "0, 255, 170" };
        case "spider-red":
        default:
          return { primary: "255, 0, 60", secondary: "0, 240, 255" };
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = 1.5 + Math.random() * 2.5;
        this.opacity = 0.2 + Math.random() * 0.6;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce bounds
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction (repel slightly or attract slightly)
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            // Apply gentle drift toward or away from mouse to make the web feel elastic
            const force = (150 - dist) / 1500;
            this.x -= dx * force;
            this.y -= dy * force;
          }
        }
      }
      draw(cCtx, rgb) {
        cCtx.beginPath();
        cCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        cCtx.fillStyle = `rgba(${rgb.primary}, ${this.opacity})`;
        cCtx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    init();

    // Mouse listener (only active on non-touch devices)
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    const drawConnections = (colors) => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect nodes to other nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.primary}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect nodes to mouse pointer (creates Spider web anchoring to mouse cursor)
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectionDist) {
            const alpha = (1 - dist / mouseConnectionDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Connect to mouse with neon secondary color for visual pop
            ctx.strokeStyle = `rgba(${colors.secondary}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getColors();

      particles.forEach((p) => {
        p.update();
        p.draw(ctx, colors);
      });

      drawConnections(colors);

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default BackgroundWeb;
