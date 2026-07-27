import Link from "next/link";
import { cn } from "@/lib/utils";
import { LandingSection, SectionTitle } from "@/components/landing/landing-section";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { landing } from "@/content/es";

interface RoleStep {
  title: string;
  body: string;
}

interface RoleColumnProps {
  title: string;
  badge: string;
  steps: readonly RoleStep[];
  cta: string;
  tone: "neutral" | "brand";
}

function RoleColumn({ title, badge, steps, cta, tone }: RoleColumnProps) {
  const isBrand = tone === "brand";

  return (
    <div
      className={cn(
        "rounded-2xl border p-8",
        isBrand
          ? "border-line-warm bg-surface-warm"
          : "border-line bg-surface-panel"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="font-display text-2xl font-extrabold tracking-[-0.02em]">
          {title}
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-[5px] text-[10.5px] font-bold tracking-[0.14em] uppercase",
            isBrand
              ? "border-line-warm-raised bg-status-urgent-bg text-status-urgent-text"
              : "border-status-published-border bg-status-published-bg text-status-published-text"
          )}
        >
          {badge}
        </span>
      </div>

      <ol className="mt-7 flex flex-col gap-[22px]">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              className={cn(
                "flex size-[34px] shrink-0 items-center justify-center rounded-[9px] border font-display text-[13px] font-extrabold",
                isBrand
                  ? "border-line-warm-raised bg-surface-warm-raised text-brand"
                  : "border-line-raised bg-surface-raised text-ink-muted"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="font-display text-[19px] font-bold tracking-[-0.015em]">
                {step.title}
              </div>
              <p className="mt-1.5 text-[14.5px] leading-[1.6] text-ink-subtle">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        href="#precios"
        className={cn(
          "mt-[30px] block rounded-[10px] py-3.5 text-center font-display text-[15px] font-bold transition-colors",
          isBrand
            ? "bg-brand text-surface-base hover:bg-brand-hover"
            : "border border-line-control text-ink hover:border-line-control-hover"
        )}
      >
        {cta}
      </Link>
    </div>
  );
}

export function HowItWorks() {
  const { howItWorks } = landing;

  return (
    <LandingSection id="como-funciona">
      <SectionEyebrow>{howItWorks.eyebrow}</SectionEyebrow>
      <SectionTitle className="max-w-[720px]">{howItWorks.title}</SectionTitle>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RoleColumn
          title={howItWorks.transportista.title}
          badge={howItWorks.transportista.badge}
          steps={howItWorks.transportista.steps}
          cta={howItWorks.transportista.cta}
          tone="neutral"
        />
        <RoleColumn
          title={howItWorks.empresa.title}
          badge={howItWorks.empresa.badge}
          steps={howItWorks.empresa.steps}
          cta={howItWorks.empresa.cta}
          tone="brand"
        />
      </div>
    </LandingSection>
  );
}
