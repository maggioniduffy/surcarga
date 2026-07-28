import { cn } from "@/lib/utils";

interface RouteArrowProps {
  width?: number;
  className?: string;
}

/** The origin → destination arrow used in every route headline. */
export function RouteArrow({ width = 22, className }: RouteArrowProps) {
  return (
    <svg
      width={width}
      height={width / 2}
      viewBox="0 0 26 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={cn("shrink-0 text-brand", className)}
      aria-hidden
    >
      <path d="M0 6h24M19 1.5 24 6l-5 4.5" />
    </svg>
  );
}

/** Route headline: origin, arrow, destination — wraps rather than overflows. */
export function RouteHeadline({
  origin,
  destination,
  className,
  arrowClassName,
}: {
  origin: string;
  destination: string;
  className?: string;
  arrowClassName?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      <span>{origin}</span>
      <RouteArrow className={arrowClassName} />
      <span>{destination}</span>
    </div>
  );
}
