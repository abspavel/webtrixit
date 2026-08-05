import { useEffect, useState } from "react";

export type Theme = "dark" | "gray" | "green" | "orange" | "white";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("webtrix-theme");
      return (saved as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-dark", "theme-gray", "theme-green", "theme-orange", "theme-white");
    root.classList.add(`theme-${theme}`);
    localStorage.setItem("webtrix-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
