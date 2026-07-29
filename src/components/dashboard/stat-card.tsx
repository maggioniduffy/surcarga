import { CardPanel } from "@/components/common/card-panel";
import { NO_VALUE } from "@/components/common/empty-state";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  /** `null` until the figure has a source; renders an em dash. */
  value: string | null;
  hint?: string;
  /** Warm panel with an orange figure — one highlighted stat per row. */
  featured?: boolean;
}

export function StatCard({ label, value, hint, featured = false }: StatCardProps) {
  return (
    <CardPanel tone={featured ? "warm" : "default"} className="p-[22px]">
      <div className="text-[12.5px] text-ink-faint">{label}</div>
      <div
        className={cn(
          "mt-2 font-display text-[28px] leading-none font-extrabold tracking-[-0.03em] sm:text-[32px]",
          featured && "text-brand",
          value === null && "text-ink-ghost"
        )}
      >
        {value ?? NO_VALUE}
      </div>
      {hint ? <div className="mt-1.5 text-[12.5px] text-ink-ghost">{hint}</div> : null}
    </CardPanel>
  );
}
