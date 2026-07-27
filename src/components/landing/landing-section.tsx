import { cn } from "@/lib/utils";

interface LandingSectionProps {
  id?: string;
  children: React.ReactNode;
  /** Widens or narrows the inner column; the FAQ runs at a tighter measure. */
  width?: "default" | "narrow";
  className?: string;
  innerClassName?: string;
}

export function LandingSection({
  id,
  children,
  width = "default",
  className,
  innerClassName,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={cn("border-t border-line-faint px-8 py-[110px]", className)}
    >
      <div
        className={cn(
          "mx-auto",
          width === "narrow" ? "max-w-[920px]" : "max-w-[1240px]",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-[18px] font-display text-[clamp(2rem,5vw,52px)] leading-[1.02] font-extrabold tracking-[-0.035em]",
        className
      )}
    >
      {children}
    </h2>
  );
}
