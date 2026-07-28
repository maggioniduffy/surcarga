import { cn } from "@/lib/utils";

/** Solid uppercase pill used for Urgente / Destacada / Destacado. */
export function StatusBadge({ children, className }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "rounded-full bg-brand px-2.5 py-0.5 font-display text-[9.5px] font-bold tracking-[0.14em] text-surface-base uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}

export type TagTone = "neutral" | "published" | "pending" | "urgent" | "muted";

const tagToneClasses: Record<TagTone, string> = {
  neutral: "border-line-raised bg-surface-control text-ink-muted",
  published:
    "border-status-published-border bg-status-published-bg text-status-published-text",
  pending: "border-[#3a3320] bg-[#171307] text-status-pending-text",
  urgent: "border-line-warm-raised bg-status-urgent-bg text-status-urgent-text",
  muted: "border-line-raised bg-surface-control text-ink-ghost line-through",
};

/** Small rounded-rect tag for cargo types, access status and verification. */
export function TagPill({
  tone = "neutral",
  className,
  children,
}: {
  tone?: TagTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "rounded-[7px] border px-2.5 py-[5px] text-[12.5px]",
        tagToneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export type RouteDensity = "high" | "medium" | "low";

const densityClasses: Record<RouteDensity, string> = {
  high: "bg-route-high",
  medium: "bg-route-medium",
  low: "bg-route-low",
};

/** Availability dot: green / yellow / orange per the route density scale. */
export function DensityDot({
  density,
  className,
}: {
  density: RouteDensity;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("size-[7px] shrink-0 rounded-full", densityClasses[density], className)}
    />
  );
}
