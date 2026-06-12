/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "bg-base": "var(--color-bg-base)",
        "bg-card": "var(--color-bg-card)",
        "glow-color": "var(--color-glow)",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "neon-primary": "0 0 15px var(--color-glow)",
        "neon-hover": "0 0 25px var(--color-glow), 0 0 50px var(--color-glow)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "radar": "radar 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 15px var(--color-glow)",
            borderColor: "var(--color-primary)",
          },
          "50%": {
            boxShadow: "0 0 25px var(--color-glow), 0 0 10px var(--color-primary)",
            borderColor: "var(--color-secondary)",
          },
        },
        radar: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}
