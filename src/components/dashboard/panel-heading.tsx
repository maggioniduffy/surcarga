import { ActionLink } from "@/components/common/action";
import { cn } from "@/lib/utils";

interface PanelHeadingProps {
  eyebrow: string;
  eyebrowTone: "brand" | "published";
  /** Account name from the session; falls back to a nameless greeting. */
  name: string | null;
  greeting: { lead: string; tail: string; fallback: string };
  summary: {
    lead: string;
    tail: string;
    count: number;
    unit: { one: string; many: string };
  };
  cta: { label: string; href: string };
}

/** Greeting block at the top of each dashboard role panel. */
export function PanelHeading({
  eyebrow,
  eyebrowTone,
  name,
  greeting,
  summary,
  cta,
}: PanelHeadingProps) {
  const unit = summary.count === 1 ? summary.unit.one : summary.unit.many;

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
          {name ? `${greeting.lead}${name}${greeting.tail}` : greeting.fallback}
        </h1>
        <p className="mt-2 text-[15.5px] text-ink-subtle">
          {summary.lead}
          <span className="font-semibold text-brand">{`${summary.count} ${unit}`}</span>
          {summary.tail}
        </p>
      </div>

      <ActionLink href={cta.href} size="md">
        {cta.label}
      </ActionLink>
    </div>
  );
}
