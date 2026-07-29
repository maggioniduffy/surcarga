import Link from "next/link";
import { NO_VALUE } from "@/components/common/empty-state";
import { TopoLines } from "@/components/landing/topo-lines";
import { landing } from "@/content/es";

/**
 * Counter values keyed by the ids in `landing.hero.stats`; a stat with no
 * measured value yet renders an em dash.
 */
export function Hero({ stats = {} }: { stats?: Readonly<Record<string, string>> }) {
  const { hero } = landing;

  return (
    <section className="relative overflow-hidden px-8 pt-[180px] pb-[110px]">
      <TopoLines variant="hero" />

      {/* Warm glow bleeding down from behind the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-160px] left-1/2 h-[520px] w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,90,31,0.10), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-line-warm bg-status-featured-bg px-[15px] py-[7px] text-[11.5px] font-semibold tracking-[0.18em] text-brand uppercase">
          <span className="size-1.5 rounded-full bg-brand" />
          {hero.eyebrow}
        </div>

        <h1 className="mx-auto mt-7 max-w-[960px] font-display text-[clamp(3rem,9vw,100px)] leading-[0.92] font-black tracking-[-0.04em] text-balance">
          {hero.titleLead}
          <br />
          <span className="text-brand">{hero.titleAccent}</span>
        </h1>

        <p className="mx-auto mt-[26px] max-w-[660px] text-[18.5px] leading-[1.6] text-ink-subtle text-pretty">
          {hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link
            href="#como-funciona"
            className="rounded-[11px] bg-brand px-7 py-4 font-display text-[16.5px] font-bold text-on-brand transition-colors hover:bg-brand-hover"
          >
            {hero.ctaShipper}
          </Link>
          <Link
            href="#como-funciona"
            className="rounded-[11px] border border-line-control px-[26px] py-4 font-display text-[16.5px] font-bold text-ink transition-colors hover:border-line-control-hover"
          >
            {hero.ctaCarrier}
          </Link>
        </div>

        <p className="mt-3.5 text-[13px] text-ink-dim">{hero.note}</p>

        <dl className="mt-[72px] flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {hero.stats.map((stat, index) => (
            <div key={stat.id} className="flex items-center gap-x-14">
              {index > 0 && (
                <span aria-hidden className="hidden h-12 w-px bg-line-subtle sm:block" />
              )}
              <div>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <div className="font-display text-[34px] font-extrabold tracking-[-0.03em]">
                    {("value" in stat ? stat.value : stats[stat.id]) ?? NO_VALUE}
                  </div>
                  <div className="mt-1 text-[13px] text-ink-faint">{stat.label}</div>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
