"use client";

import { cn } from "@/lib/utils";

interface ChipToggleProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  /** `pill` is the fully-rounded filter chip; `chip` the squarer form toggle. */
  shape?: "chip" | "pill";
}

/** Multi-select toggle used for cargo types on the form and filter screens. */
export function ChipToggle({ label, selected, onToggle, shape = "chip" }: ChipToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        "cursor-pointer border font-semibold transition-colors",
        shape === "chip"
          ? "rounded-[9px] px-[15px] py-2.5 text-[13.5px]"
          : "rounded-full px-3 py-1.5 text-[12.5px]",
        selected
          ? "border-line-warm-raised bg-status-urgent-bg text-brand"
          : "border-line-raised bg-surface-control text-ink-subtle hover:text-ink"
      )}
    >
      {label}
    </button>
  );
}
