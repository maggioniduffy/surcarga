import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  /** Rendered dimmed after the label, e.g. "(opcional)". */
  hint?: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

/** Label-above-control layout shared by every form on these screens. */
export function Field({ label, hint, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <Label htmlFor={htmlFor} className="mb-2 block text-[13px] font-normal text-ink-subtle">
        {label}
        {hint ? <span className="ml-1 text-ink-ghost">{hint}</span> : null}
      </Label>
      {children}
    </div>
  );
}

/** Shared control chrome: sunken surface, hairline border, 10px radius. */
export const controlClassName =
  "w-full min-w-0 rounded-[10px] border border-line-raised bg-surface-control px-3.5 py-3 font-sans text-[14.5px] text-ink transition-colors placeholder:text-ink-ghost hover:border-line-control-hover focus-visible:border-brand focus-visible:ring-0 focus-visible:outline-none";
