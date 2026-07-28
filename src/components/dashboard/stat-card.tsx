import { CardPanel } from "@/components/common/card-panel";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  /** Warm panel with an orange figure — one highlighted stat per row. */
  featured?: boolean;
}

export function StatCard({ label, value, hint, featured = false }: StatCardProps) {
  return (
    <CardPanel tone={featured ? "warm" : "default"} className="p-[22px]">
      <div className={cn("text-[12.5px]", featured ? "text-ink-faint" : "text-ink-faint")}>
        {label}
      </div>
      <div
        className={cn(
          "mt-2 font-display text-[28px] leading-none font-extrabold tracking-[-0.03em] sm:text-[32px]",
          featured && "text-brand"
        )}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[12.5px] text-ink-ghost">{hint}</div>
    </CardPanel>
  );
}
