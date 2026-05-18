import { createContext, useContext, useState, type ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDark() {
    setDarkMode((prev) => {
      const next = !prev;
      // add/remove "dark" class on <html> for tailwind dark mode
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
