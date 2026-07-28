"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Owns the light/dark preference. The `dark` class on <html> is set by the inline
 * script before hydration; this provider only keeps React state in sync with it and
 * writes subsequent changes back to the DOM and localStorage.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer reads the same source as the inline script, so state always
  // matches the DOM the script produced and hydration stays clean.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return DEFAULT_THEME;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Private browsing or blocked storage — the theme still applies for this session.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
}
