import Link from "next/link";
import { cn } from "@/lib/utils";
import { LandingSection, SectionTitle } from "@/components/landing/landing-section";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { landing } from "@/content/es";

function CheckIcon() {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-brand"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function PricingSection() {
  const { pricing } = landing;

  return (
    <LandingSection id="precios">
      <SectionEyebrow>{pricing.eyebrow}</SectionEyebrow>
      <SectionTitle className="mb-3 max-w-[700px]">{pricing.title}</SectionTitle>
      <p className="max-w-[600px] text-[17px] leading-[1.6] text-ink-subtle">
        {pricing.subtitle}
      </p>

      <div
        // `on-dark-panel` keeps both gradient stops on the dark scale, so the banner
        // stays a dark green accent block in light mode instead of fading to white.
        className="on-dark-panel mt-11 flex flex-wrap items-center gap-7 rounded-2xl border border-status-published-border p-[30px_32px]"
        style={{
          background:
            "linear-gradient(180deg, var(--color-status-published-bg), var(--color-surface-sunken))",
        }}
      >
        <div className="min-w-[280px] flex-1">
          <div className="text-[11px] font-semibold tracking-[0.16em] text-status-published-text uppercase">
            {pricing.carrierBanner.kicker}
          </div>
          <div className="mt-3 font-display text-[34px] leading-tight font-extrabold tracking-[-0.03em]">
            {pricing.carrierBanner.title}
          </div>
          <p className="mt-2.5 max-w-[560px] text-[15px] leading-[1.6] text-ink-subtle">
            {pricing.carrierBanner.body}
          </p>
        </div>
        <Link
          href="#contacto"
          className="rounded-[10px] border border-[#2f4a3a] px-6 py-3.5 font-display text-[15px] font-bold text-ink transition-colors hover:border-status-published-text"
        >
          {pricing.carrierBanner.cta}
        </Link>
      </div>

      <div className="mt-12 mb-5 text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
        {pricing.shipperLabel}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {pricing.tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative rounded-2xl border p-[30px]",
              tier.featured
                ? "on-dark-panel border-brand bg-surface-warm-featured shadow-[0_0_0_4px_rgba(255,90,31,0.07)]"
                : "border-line bg-surface-panel"
            )}
          >
            {"badge" in tier && tier.badge ? (
              <span className="absolute -top-[11px] left-[30px] rounded-full bg-brand px-3 py-1 font-display text-[10.5px] font-bold tracking-[0.14em] text-on-brand uppercase">
                {tier.badge}
              </span>
            ) : null}

            <div className="font-display text-[21px] font-bold">{tier.name}</div>

            <div className="mt-4 flex items-baseline gap-2.5">
              <span
                className={cn(
                  "font-display text-[50px] font-black tracking-[-0.04em]",
                  tier.featured && "text-brand"
                )}
              >
                {tier.price}
              </span>
              <span className="text-sm text-ink-faint">{tier.unit}</span>
            </div>

            <p className="mt-3 text-[14.5px] leading-[1.55] text-ink-subtle">{tier.body}</p>

            <Link
              href="#contacto"
              className={cn(
                "mt-6 block rounded-[10px] py-3.5 text-center font-display text-[14.5px] font-bold transition-colors",
                tier.featured
                  ? "bg-brand text-on-brand hover:bg-brand-hover"
                  : "border border-line-control text-ink hover:border-line-control-hover"
              )}
            >
              {tier.cta}
            </Link>

            <ul className="mt-[26px] flex flex-col gap-3 border-t border-line-subtle pt-[22px]">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-2.5 text-[14.5px] text-ink-muted">
                  <CheckIcon />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3.5 rounded-xl border border-line bg-surface-sunken px-5 py-4">
        <span className="text-[14.5px] text-ink-muted">{pricing.volume.question}</span>
        <span className="text-[14.5px] text-ink-subtle">{pricing.volume.answer}</span>
        <Link
          href={pricing.volume.href}
          className="ml-auto text-[14.5px] font-semibold text-brand transition-colors hover:text-brand-link-hover"
        >
          {pricing.volume.cta}
        </Link>
      </div>
    </LandingSection>
  );
}
