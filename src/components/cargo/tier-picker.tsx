"use client";

import { cn } from "@/lib/utils";

export interface TierOption {
  id: string;
  name: string;
  price: string;
  body: string;
}

interface TierPickerProps {
  label: string;
  options: readonly TierOption[];
  value: string;
  onChange: (id: string) => void;
}

/** Radio cards that set the listing fee tier. */
export function TierPicker({ label, options, value, onChange }: TierPickerProps) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "cursor-pointer rounded-[13px] border p-[22px] text-left transition-colors",
              selected
                ? "border-brand bg-surface-warm-featured shadow-[0_0_0_4px_rgba(255,90,31,0.07)]"
                : "border-line-raised bg-surface-sunken hover:border-line-control-hover"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-lg font-bold">{option.name}</span>
              <span
                aria-hidden
                className={cn(
                  "size-[18px] shrink-0 rounded-full",
                  selected
                    ? "border-[5px] border-[#2a1409] bg-brand"
                    : "border-[1.5px] border-line-control-hover"
                )}
              />
            </div>
            <div
              className={cn(
                "mt-3.5 font-display text-[32px] leading-none font-black tracking-[-0.03em]",
                selected && "text-brand"
              )}
            >
              {option.price}
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-subtle">{option.body}</p>
          </button>
        );
      })}
    </div>
  );
}
