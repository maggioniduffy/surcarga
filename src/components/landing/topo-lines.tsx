import { cn } from "@/lib/utils";

/**
 * Decorative contour lines evoking the ridges and route traces of the basin.
 * Purely presentational — hidden from assistive tech.
 */

const HERO_PATHS = [
  { d: "M-40,120 C160,60 280,180 480,120 C680,60 800,180 1000,120 C1200,60 1320,180 1520,120", opacity: 1 },
  { d: "M-40,170 C160,110 280,230 480,170 C680,110 800,230 1000,170 C1200,110 1320,230 1520,170", opacity: 0.85 },
  { d: "M-40,220 C160,160 280,280 480,220 C680,160 800,280 1000,220 C1200,160 1320,280 1520,220", opacity: 0.7 },
  { d: "M-40,290 C160,230 280,350 480,290 C680,230 800,350 1000,290 C1200,230 1320,350 1520,290", opacity: 0.5 },
  { d: "M-40,360 C160,300 280,420 480,360 C680,300 800,420 1000,360 C1200,300 1320,420 1520,360", opacity: 0.35 },
  { d: "M-40,440 C160,380 280,500 480,440 C680,380 800,500 1000,440 C1200,380 1320,500 1520,440", opacity: 0.22 },
];

const BAND_PATHS = [
  { d: "M-40,80 C200,20 320,150 560,90 C800,30 920,160 1160,100 C1320,60 1400,120 1520,100", opacity: 1 },
  { d: "M-40,160 C200,100 320,230 560,170 C800,110 920,240 1160,180 C1320,140 1400,200 1520,180", opacity: 0.7 },
  { d: "M-40,250 C200,190 320,320 560,260 C800,200 920,330 1160,270 C1320,230 1400,290 1520,270", opacity: 0.45 },
];

const INVERTED_PATHS = [
  { d: "M-40,70 C160,20 280,130 480,80 C680,30 800,140 1000,90 C1120,60 1180,100 1260,90", opacity: 1 },
  { d: "M-40,150 C160,100 280,210 480,160 C680,110 800,220 1000,170 C1120,140 1180,180 1260,170", opacity: 1 },
  { d: "M-40,240 C160,190 280,300 480,250 C680,200 800,310 1000,260 C1120,230 1180,270 1260,260", opacity: 1 },
];

const VARIANTS = {
  hero: { paths: HERO_PATHS, viewBox: "0 0 1440 520", opacity: "opacity-50", strokeWidth: 1 },
  band: { paths: BAND_PATHS, viewBox: "0 0 1440 400", opacity: "opacity-35", strokeWidth: 1 },
  inverted: { paths: INVERTED_PATHS, viewBox: "0 0 1200 320", opacity: "opacity-[0.22]", strokeWidth: 1.4 },
} as const;

interface TopoLinesProps {
  variant?: keyof typeof VARIANTS;
  className?: string;
}

export function TopoLines({ variant = "hero", className }: TopoLinesProps) {
  const { paths, viewBox, opacity, strokeWidth } = VARIANTS[variant];

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        opacity,
        className
      )}
    >
      <g
        fill="none"
        stroke={variant === "inverted" ? "var(--color-surface-base)" : "var(--color-topo-line)"}
        strokeWidth={strokeWidth}
      >
        {paths.map((path) => (
          <path key={path.d} d={path.d} opacity={path.opacity} />
        ))}
      </g>
    </svg>
  );
}
