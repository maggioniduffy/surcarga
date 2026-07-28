"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RangeFieldProps {
  id: string;
  label: string;
  /** Live value shown next to the label, already formatted for display. */
  valueLabel: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
  /** Larger type for the in-form slider; smaller for the filter sidebar. */
  size?: "sm" | "md";
  className?: string;
}

export function RangeField({
  id,
  label,
  valueLabel,
  min,
  max,
  step = 1,
  value,
  onValueChange,
  minLabel,
  maxLabel,
  size = "md",
  className,
}: RangeFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <Label htmlFor={id} className="text-[13px] font-normal text-ink-subtle">
          {label}
        </Label>
        <span
          className={cn(
            "font-display font-bold text-brand",
            size === "md" ? "text-[19px]" : "text-[13.5px]"
          )}
        >
          {valueLabel}
        </span>
      </div>

      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => onValueChange(Array.isArray(next) ? next[0] : next)}
        className="[&_[data-slot=slider-range]]:bg-brand [&_[data-slot=slider-thumb]]:border-brand [&_[data-slot=slider-thumb]]:bg-brand [&_[data-slot=slider-track]]:bg-surface-control"
      />

      <div className="mt-1.5 flex justify-between text-[11.5px] text-ink-ghost">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
