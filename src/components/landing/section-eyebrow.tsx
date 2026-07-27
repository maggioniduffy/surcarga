import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  tone?: "brand" | "muted";
  className?: string;
}

export function SectionEyebrow({
  children,
  tone = "brand",
  className,
}: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        "text-[11.5px] font-semibold tracking-[0.2em] uppercase",
        tone === "brand" ? "text-brand" : "text-ink-faint",
        className
      )}
    >
      {children}
    </div>
  );
}
