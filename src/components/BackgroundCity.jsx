import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const BackgroundCity = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Check device type
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     window.matchMedia("(pointer: coarse)").matches;

    // Canvas sizing
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Offscreen canvases for parallax caching
    const layers = [
      document.createElement("canvas"), // Far Skyline
      document.createElement("canvas"), // Mid Skyline
      document.createElement("canvas"), // Near Skyline
    ];
    const layerCtxs = layers.map((c) => c.getContext("2d"));

    // Theme values for rendering
    const getThemeColors = () => {
      switch (theme) {
        case "spider-blue":
          return {
            neon: "#0055ff",
            secondary: "#ff003c",
            skylineFar: "#070c1b",
            skylineMid: "#0a1024",
            skylineNear: "#0e1630",
          };
        case "cyber-neon":
          return {
            neon: "#bc00dd",
            secondary: "#00ffaa",
            skylineFar: "#0c0114",
            skylineMid: "#140221",
            skylineNear: "#1c042e",
          };
        case "spider-red":
        default:
          return {
            neon: "#ff003c",
            secondary: "#00f0ff",
            skylineFar: "#0c0812",
            skylineMid: "#120d1c",
            skylineNear: "#181226",
          };
      }
    };

    // Draw silhouettes into offscreen canvases
    const drawSkylineLayers = () => {
      const colors = getThemeColors();
      
      layers.forEach((l, idx) => {
        l.width = width;
        l.height = height;
        const lCtx = layerCtxs[idx];
        lCtx.clearRect(0, 0, width, height);

        // Define building sizes per layer
        const buildingCount = idx === 0 ? 15 : idx === 1 ? 12 : 8;
        const color = idx === 0 ? colors.skylineFar : idx === 1 ? colors.skylineMid : colors.skylineNear;
        
        lCtx.fillStyle = color;
        lCtx.beginPath();
        lCtx.moveTo(0, height);

        const buildWidth = width / buildingCount;

        for (let i = 0; i <= buildingCount; i++) {
          const w = buildWidth * (0.8 + Math.random() * 0.4);
          const h = height * (0.2 + (2 - idx) * 0.15 + Math.random() * 0.2);
          const x = i * buildWidth;
          const y = height - h;

          lCtx.lineTo(x, y);
          lCtx.lineTo(x + w, y);

          // Draw neon lights / windows occasionally on closer layers
          if (idx > 0 && Math.random() > 0.3) {
            lCtx.save();
            lCtx.fillStyle = Math.random() > 0.5 ? colors.neon : colors.secondary;
            lCtx.shadowBlur = 8;
            lCtx.shadowColor = lCtx.fillStyle;
            
            // Draw small windows
            const winRows = Math.floor(h / 30);
            const winCols = Math.floor(w / 20);
            for (let r = 1; r < winRows - 1; r++) {
              if (Math.random() > 0.6) continue;
              for (let c = 1; c < winCols - 1; c++) {
                if (Math.random() > 0.4) {
                  lCtx.fillRect(x + c * 20, y + r * 30, 4, 6);
                }
              }
            }
            lCtx.restore();
          }

          // Antennas on far layer
          if (idx === 0 && Math.random() > 0.6) {
            lCtx.save();
            lCtx.strokeStyle = colors.neon;
            lCtx.lineWidth = 1.5;
            lCtx.beginPath();
            lCtx.moveTo(x + w / 2, y);
            lCtx.lineTo(x + w / 2, y - 40 - Math.random() * 30);
            lCtx.stroke();
            
            // Blinking beacon
            lCtx.fillStyle = "#ffffff";
            lCtx.beginPath();
            lCtx.arc(x + w / 2, y - 40, 2, 0, Math.PI * 2);
            lCtx.fill();
            lCtx.restore();
          }
        }
        lCtx.lineTo(width, height);
        lCtx.closePath();
        lCtx.fill();
      });
    };

    drawSkylineLayers();

    // Particle class for cyber sparks / embers
    class Ember {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = 1 + Math.random() * 3;
        this.speedY = -(0.5 + Math.random() * 1.5);
        this.speedX = -0.5 + Math.random() * 1;
        this.opacity = 0.2 + Math.random() * 0.8;
        this.color = Math.random() > 0.5 ? "neon" : "secondary";
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.002;
        if (this.y < 0 || this.opacity <= 0) {
          this.reset();
        }
      }
      draw(cCtx, colors) {
        cCtx.save();
        cCtx.fillStyle = this.color === "neon" ? colors.neon : colors.secondary;
        cCtx.globalAlpha = this.opacity;
        cCtx.shadowBlur = 10;
        cCtx.shadowColor = cCtx.fillStyle;
        cCtx.beginPath();
        cCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cCtx.fill();
        cCtx.restore();
      }
    }

    // Particle class for falling neon rain
    class RainDrop {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = -50 - Math.random() * height;
        this.length = 15 + Math.random() * 25;
        this.speedY = 10 + Math.random() * 10;
        this.speedX = 1 + Math.random() * 2; // subtle angle
        this.opacity = 0.15 + Math.random() * 0.25;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > height || this.x > width) {
          this.reset();
        }
      }
      draw(cCtx, colors) {
        cCtx.save();
        cCtx.strokeStyle = colors.secondary;
        cCtx.globalAlpha = this.opacity;
        cCtx.lineWidth = 1;
        cCtx.beginPath();
        cCtx.moveTo(this.x, this.y);
        lCtx.lineTo(this.x + this.speedX, this.y + this.length);
        cCtx.stroke();
        cCtx.restore();
      }
    }

    // Set particle limit based on mobile optimization strategy
    const emberCount = isMobile ? 15 : 50;
    const rainCount = isMobile ? 25 : 80;

    const embers = Array.from({ length: emberCount }, () => new Ember());
    // Rain is optional, we will include it with low opacity to feel cyberpunk
    const rain = Array.from({ length: rainCount }, () => new RainDrop());

    // Scroll offset variables
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getThemeColors();

      // Render sky background gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#010206");
      skyGrad.addColorStop(0.5, "#030712");
      skyGrad.addColorStop(1, colors.skylineFar);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Cyber fog overlay (distant)
      const fogGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
      fogGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      fogGrad.addColorStop(1, colors.skylineFar);
      
      // Draw Skyline Layers with Scroll Parallax multipliers
      // Far Layer (0.08x scroll speed)
      ctx.drawImage(layers[0], 0, scrollY * 0.08);
      ctx.fillStyle = fogGrad;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      // Mid Layer (0.15x scroll speed)
      ctx.drawImage(layers[1], 0, scrollY * 0.15);
      
      // Near Layer (0.3x scroll speed)
      ctx.drawImage(layers[2], 0, scrollY * 0.3);

      // Draw embers (floating particles)
      embers.forEach((ember) => {
        ember.update();
        ember.draw(ctx, colors);
      });

      // Draw subtle falling neon rain
      ctx.save();
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = 1;
      rain.forEach((drop) => {
        drop.update();
        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.speedX * 0.6, drop.y + drop.length);
        ctx.stroke();
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    // Handle Window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawSkylineLayers();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none"
    />
  );
};

export default BackgroundCity;
