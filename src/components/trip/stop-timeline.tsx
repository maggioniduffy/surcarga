import { cn } from "@/lib/utils";

export interface Stop {
  id: string;
  name: string;
  meta?: string;
  badge?: string;
  body: string;
}

/**
 * Origin → stop → destination trail. The rail is drawn with border and dot
 * elements rather than a fixed-height SVG so it tracks the text as it wraps.
 */
export function StopTimeline({ stops }: { stops: readonly Stop[] }) {
  return (
    <ol className="mt-6 flex flex-col">
      {stops.map((stop, index) => {
        const last = index === stops.length - 1;
        return (
          <li key={stop.id} className="flex gap-5">
            <div className="flex shrink-0 flex-col items-center">
              <span
                aria-hidden
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  index === 0
                    ? "bg-brand"
                    : last
                      ? "border-2 border-line-raised bg-surface-base"
                      : "border-2 border-brand bg-surface-base"
                )}
              />
              {!last ? (
                <span
                  aria-hidden
                  className={cn(
                    "w-0.5 flex-1",
                    index === 0 ? "bg-brand" : "bg-line-raised"
                  )}
                />
              ) : null}
            </div>

            <div className={cn("min-w-0 flex-1", !last && "pb-8")}>
              <div className="-mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                <span className="font-display text-xl font-bold tracking-[-0.02em]">
                  {stop.name}
                </span>
                {stop.badge ? (
                  <span className="rounded-md border border-line-warm-raised bg-surface-warm-raised px-2 py-0.5 text-[11px] font-semibold text-brand">
                    {stop.badge}
                  </span>
                ) : null}
                {stop.meta ? (
                  <span className="text-[13px] text-ink-faint">{stop.meta}</span>
                ) : null}
              </div>
              <p className="mt-1.5 text-sm leading-[1.55] text-ink-subtle">{stop.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
