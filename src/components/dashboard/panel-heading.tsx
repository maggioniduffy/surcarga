import { ActionLink } from "@/components/common/action";
import { cn } from "@/lib/utils";

interface PanelHeadingProps {
  eyebrow: string;
  eyebrowTone: "brand" | "published";
  greeting: string;
  summaryLead: string;
  summaryHighlight: string;
  summaryTail: string;
  cta: { label: string; href: string };
}

/** Greeting block at the top of each dashboard role panel. */
export function PanelHeading({
  eyebrow,
  eyebrowTone,
  greeting,
  summaryLead,
  summaryHighlight,
  summaryTail,
  cta,
}: PanelHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <div
          className={cn(
            "text-[11px] font-semibold tracking-[0.18em] uppercase",
            eyebrowTone === "brand" ? "text-brand" : "text-status-published-text"
          )}
        >
          {eyebrow}
        </div>
        <h1 className="mt-3.5 font-display text-[clamp(2rem,7vw,40px)] leading-[1.02] font-black tracking-[-0.035em]">
          {greeting}
        </h1>
        <p className="mt-2 text-[15.5px] text-ink-subtle">
          {summaryLead}
          <span className="font-semibold text-brand">{summaryHighlight}</span>
          {summaryTail}
        </p>
      </div>

      <ActionLink href={cta.href} size="md">
        {cta.label}
      </ActionLink>
    </div>
  );
}
