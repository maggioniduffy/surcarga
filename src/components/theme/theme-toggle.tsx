"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { appShell } from "@/content/es";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /** The landing header runs slightly larger controls than the app header. */
  size?: 34 | 36;
  className?: string;
}

export function ThemeToggle({ size = 34, className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={appShell.theme.toggle}
      aria-label={dark ? appShell.theme.switchToLight : appShell.theme.switchToDark}
      aria-pressed={!dark}
      className={cn(
        "flex shrink-0 cursor-pointer items-center justify-center rounded-[9px] border border-line-control text-ink-subtle transition-colors hover:border-line-control-hover hover:text-ink",
        className
      )}
      style={{ width: size, height: size }}
    >
      {dark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}
