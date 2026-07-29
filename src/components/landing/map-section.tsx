import { EmptyState } from "@/components/common/empty-state";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { SectionTitle } from "@/components/landing/landing-section";
import { TopoLines } from "@/components/landing/topo-lines";
import { CoverageMap } from "@/components/landing/coverage-map";
import { landing } from "@/content/es";
import type { CatalogLocation } from "@/lib/locations";

const DENSITY_DOT = {
  high: "bg-route-high",
  medium: "bg-route-medium",
  low: "bg-route-low",
} as const;

type Density = keyof typeof DENSITY_DOT;

/** The most recently published trip, from the trips service. */
export interface RecentListing {
  route: string;
  age: string;
  body: string;
  capacity: string;
  rating: string;
}

export interface Corridor {
  route: string;
  trips: string;
  density: Density;
}

interface MapSectionProps {
  locations: readonly CatalogLocation[];
  listing?: RecentListing | null;
  corridors?: readonly Corridor[];
}

export function MapSection({ locations, listing = null, corridors = [] }: MapSectionProps) {
  const { map } = landing;

  return (
    <section className="relative overflow-hidden border-t border-line-faint px-8 py-[110px]">
      <TopoLines variant="band" />

      <div className="relative mx-auto max-w-[1240px]">
        <SectionEyebrow>{map.eyebrow}</SectionEyebrow>
        <SectionTitle className="max-w-[700px]">{map.title}</SectionTitle>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_336px]">
          <div className="rounded-2xl border border-line bg-surface-sunken p-[22px]">
            <CoverageMap locations={locations} />

            <div className="mt-[18px] flex flex-wrap items-center gap-x-[26px] gap-y-3 border-t border-line-subtle pt-[18px]">
              {map.legend.map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-center gap-2 text-[13px] text-ink-subtle"
                >
                  <span
                    className={`size-2 rounded-full ${DENSITY_DOT[entry.density as Density]}`}
                  />
                  {entry.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <article className="rounded-xl border border-line bg-surface-panel p-[22px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
                  {map.listing.kicker}
                </span>
                {listing ? <span className="text-xs text-ink-ghost">{listing.age}</span> : null}
              </div>

              {!listing ? (
                <EmptyState className="mt-3.5">{map.listing.empty}</EmptyState>
              ) : (
                <>
                  <h3 className="mt-3.5 mb-1 font-display text-[22px] font-bold tracking-[-0.02em]">
                    {listing.route}
                  </h3>
                  <p className="mb-4 text-sm leading-[1.55] text-ink-subtle">{listing.body}</p>

                  <dl className="grid grid-cols-2 gap-3 border-t border-line-subtle pt-3.5">
                    <div>
                      <dt className="text-[11.5px] text-ink-dim">{map.listing.capacityLabel}</dt>
                      <dd className="mt-0.5 font-display text-[17px] font-bold">
                        {listing.capacity}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11.5px] text-ink-dim">{map.listing.ratingLabel}</dt>
                      <dd className="mt-0.5 font-display text-[17px] font-bold text-brand">
                        {listing.rating}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 rounded-[9px] bg-brand py-[11px] text-center font-display text-sm font-bold text-on-brand">
                    {map.listing.cta}
                  </div>
                </>
              )}
            </article>

            <article className="flex-1 rounded-xl border border-line bg-surface-panel p-[22px]">
              <div className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
                {map.corridors.title}
              </div>
              {corridors.length === 0 ? (
                <EmptyState className="mt-4">{map.corridors.empty}</EmptyState>
              ) : (
                <ul className="mt-4 flex flex-col gap-3.5">
                  {corridors.map((corridor) => (
                    <li key={corridor.route} className="flex items-center gap-2.5 text-sm">
                      <span
                        className={`size-2 shrink-0 rounded-full ${DENSITY_DOT[corridor.density]}`}
                      />
                      <span className="text-ink-muted">{corridor.route}</span>
                      <span className="ml-auto text-ink-faint">{corridor.trips}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
