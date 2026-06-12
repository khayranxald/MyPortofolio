import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved || "spider-red";
  });

  const setTheme = (newTheme) => {
    if (newTheme === "spider-red" || newTheme === "spider-blue" || newTheme === "cyber-neon") {
      setThemeState(newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    // Remove existing themes
    root.classList.remove("theme-spider-red", "theme-spider-blue", "theme-cyber-neon");
    // Add new theme class
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
