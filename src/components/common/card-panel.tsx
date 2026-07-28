import { cn } from "@/lib/utils";

type PanelTone = "default" | "sunken" | "warm" | "warning" | "published";

/*
 * `warm`, `warning` and `published` are accent panels: the source designs pin them to
 * their dark fill in both themes, so they carry `on-dark-panel` to keep the dark ink
 * and line scale for everything nested inside them.
 */
const toneClasses: Record<PanelTone, string> = {
  default: "border-line bg-surface-panel",
  sunken: "border-line bg-surface-sunken",
  warm: "on-dark-panel border-line-warm-raised bg-surface-warm",
  warning: "on-dark-panel border-[#3a3320] bg-[#171307]",
  published: "on-dark-panel border-status-published-border bg-status-published-bg",
};

interface CardPanelProps extends React.ComponentProps<"div"> {
  tone?: PanelTone;
}

/** The bordered card that every screen in this design is built out of. */
export function CardPanel({ tone = "default", className, ...props }: CardPanelProps) {
  return (
    <div className={cn("rounded-2xl border", toneClasses[tone], className)} {...props} />
  );
}

type EyebrowTone = "brand" | "muted" | "published";

const eyebrowToneClasses: Record<EyebrowTone, string> = {
  brand: "text-brand",
  muted: "text-ink-faint",
  published: "text-status-published-text",
};

interface CardEyebrowProps extends React.ComponentProps<"div"> {
  tone?: EyebrowTone;
}

/** The uppercase micro-label that heads every card in this design. */
export function CardEyebrow({ tone = "muted", className, ...props }: CardEyebrowProps) {
  return (
    <div
      className={cn(
        "text-[11px] font-semibold tracking-[0.16em] uppercase",
        eyebrowToneClasses[tone],
        className
      )}
      {...props}
    />
  );
}

/** Card header with an eyebrow on the left and an optional link on the right. */
export function CardHeader({
  eyebrow,
  tone = "muted",
  action,
}: {
  eyebrow: string;
  tone?: EyebrowTone;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <CardEyebrow tone={tone}>{eyebrow}</CardEyebrow>
      {action}
    </div>
  );
}
