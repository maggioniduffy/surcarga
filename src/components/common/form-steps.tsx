import { cn } from "@/lib/utils";

interface FormStepsProps {
  label: string;
  steps: readonly { label: string; done: boolean }[];
}

/** Numbered step trail beside a publishing form's title. */
export function FormSteps({ label, steps }: FormStepsProps) {
  return (
    <ol aria-label={label} className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[13px]">
      {steps.map((step, index) => (
        <li key={step.label} className="flex items-center gap-3.5">
          <span
            className={cn(
              "flex items-center gap-2.5",
              step.done ? "text-ink" : "text-ink-faint"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-6 items-center justify-center rounded-full font-display text-xs font-extrabold",
                step.done
                  ? "bg-brand text-on-brand"
                  : "border border-line-raised text-ink-faint"
              )}
            >
              {index + 1}
            </span>
            {step.label}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden className="h-px w-5 bg-line-raised" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

interface PageIntroProps {
  badge: React.ReactNode;
  title: string;
  subtitle: string;
  steps: React.ReactNode;
}

/** Badge + headline + subtitle on the left, step trail on the right. */
export function PageIntro({ badge, title, subtitle, steps }: PageIntroProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        {badge}
        <h1 className="mt-[18px] font-display text-[clamp(2.25rem,8vw,46px)] leading-[1.02] font-black tracking-[-0.035em]">
          {title}
        </h1>
        <p className="mt-2.5 max-w-[540px] text-base text-ink-subtle">{subtitle}</p>
      </div>
      {steps}
    </div>
  );
}

/** Small pill above a publishing form's headline. */
export function IntroBadge({
  tone,
  children,
}: {
  tone: "brand" | "published";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase",
        tone === "brand"
          ? "border-line-warm-raised bg-surface-warm-raised text-brand"
          : "border-status-published-border bg-status-published-bg text-status-published-text"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "brand" ? "bg-brand" : "bg-status-published-text"
        )}
      />
      {children}
    </div>
  );
}
