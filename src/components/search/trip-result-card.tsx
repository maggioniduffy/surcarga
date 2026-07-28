import { ActionLink } from "@/components/common/action";
import { CardPanel } from "@/components/common/card-panel";
import { StatusBadge, TagPill, type TagTone } from "@/components/common/pills";
import { RouteArrow } from "@/components/common/route-arrow";
import { searchTrucks } from "@/content/es";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export interface TripResult {
  id: string;
  badge?: string;
  featured: boolean;
  publishedAt: string;
  origin: string;
  destination: string;
  meta: readonly string[];
  tags: readonly { label: string; tone: string }[];
  space: string;
  rating: string;
  carrier: { initials: string; name: string; meta: string };
}

const { results } = searchTrucks;

/** One published trip in the search listing. */
export function TripResultCard({ trip }: { trip: TripResult }) {
  return (
    <CardPanel
      tone={trip.featured ? "warm" : "default"}
      className={cn(
        "flex flex-col gap-5 p-[22px_24px] xl:flex-row xl:items-start",
        !trip.featured && "transition-colors hover:border-line-control-hover"
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          {trip.badge ? <StatusBadge>{trip.badge}</StatusBadge> : null}
          <span
            className={cn("text-[12.5px]", trip.featured ? "text-ink-dim" : "text-ink-faint")}
          >
            {trip.publishedAt}
          </span>
        </div>

        <h2 className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[clamp(1.15rem,4vw,23px)] font-extrabold tracking-[-0.025em]">
          <span>{trip.origin}</span>
          <RouteArrow width={26} className={cn(!trip.featured && "text-ink-faint")} />
          <span>{trip.destination}</span>
        </h2>

        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] text-ink-subtle">
          {trip.meta.map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              {item}
              {index < trip.meta.length - 1 ? (
                <span aria-hidden className="text-line-control-hover">
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {trip.tags.map((tag) => (
            <TagPill key={tag.label} tone={tag.tone as TagTone}>
              {tag.label}
            </TagPill>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className={cn(
          "h-px w-full xl:h-auto xl:w-px xl:self-stretch",
          trip.featured ? "bg-line-warm" : "bg-line-subtle"
        )}
      />

      <div className="flex w-full flex-col gap-4 xl:w-[250px] xl:shrink-0">
        <div className="flex gap-[18px]">
          <div>
            <div className="text-[11.5px] text-ink-faint">{results.spaceLabel}</div>
            <div className="mt-1 font-display text-xl font-extrabold">{trip.space}</div>
          </div>
          <div>
            <div className="text-[11.5px] text-ink-faint">{results.ratingLabel}</div>
            <div
              className={cn(
                "mt-1 font-display text-xl font-extrabold",
                trip.featured && "text-brand"
              )}
            >
              {trip.rating}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex size-[34px] shrink-0 items-center justify-center rounded-full border border-line-raised bg-surface-control font-display text-[12.5px] font-bold text-brand"
          >
            {trip.carrier.initials}
          </span>
          <span className="text-[13px] leading-[1.3]">
            <span className="block font-semibold">{trip.carrier.name}</span>
            <span className="block text-ink-dim">{trip.carrier.meta}</span>
          </span>
        </div>

        <ActionLink
          href={routes.trip(trip.id)}
          variant={trip.featured ? "primary" : "outline"}
          block
          className="py-[11px] text-sm"
        >
          {trip.featured ? results.actions.request : results.actions.detail}
        </ActionLink>
      </div>
    </CardPanel>
  );
}
