import { cn } from "@/lib/utils";

/** Placeholder shown wherever a screen has no records to render yet. */
export function EmptyState({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "rounded-xl border border-dashed border-line-subtle px-5 py-8 text-center text-[13.5px] text-ink-faint",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Em dash stand-in for a single figure that has no value yet. */
export const NO_VALUE = "—";
