import { cn } from "@/lib/utils";

interface SpendChartProps {
  label: string;
  bars: readonly number[];
  axisStart: string;
  axisEnd: string;
}

/** Bare monthly-spend bars — the last month carries the brand fill. */
export function SpendChart({ label, bars, axisStart, axisEnd }: SpendChartProps) {
  return (
    <figure className="m-0">
      <figcaption className="sr-only">{label}</figcaption>
      <div className="mt-5 flex h-[72px] items-end gap-[7px]" aria-hidden>
        {bars.map((height, index) => (
          <div
            key={index}
            style={{ height: `${height}%` }}
            className={cn(
              "flex-1 rounded-t",
              index === bars.length - 1 ? "bg-brand" : "bg-line"
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11.5px] text-ink-ghost">
        <span>{axisStart}</span>
        <span>{axisEnd}</span>
      </div>
    </figure>
  );
}
