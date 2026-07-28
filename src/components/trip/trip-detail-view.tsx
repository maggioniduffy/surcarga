import Link from "next/link";
import { ChevronLeft, Clock } from "lucide-react";
import { AppFooter } from "@/components/app-shell/app-footer";
import { AppHeader } from "@/components/app-shell/app-header";
import { ActionButton, InlineLink } from "@/components/common/action";
import { CardEyebrow, CardHeader, CardPanel } from "@/components/common/card-panel";
import { AlertIcon, CheckIcon } from "@/components/common/icons";
import { DensityDot, StatusBadge, TagPill, type TagTone } from "@/components/common/pills";
import { RouteArrow } from "@/components/common/route-arrow";
import { StopTimeline } from "@/components/trip/stop-timeline";
import { appShell, tripDetail } from "@/content/es";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const WIDTH = "1240px";

export function TripDetailView() {
  return (
    <div className="flex flex-1 flex-col bg-surface-base">
      <AppHeader
        width={WIDTH}
        nav={appShell.nav.shipper}
        activeHref={routes.searchTrucks}
        user={tripDetail.user}
      />

      <main
        className="mx-auto w-full flex-1 px-6 pt-6 pb-20 sm:px-8"
        style={{ maxWidth: WIDTH }}
      >
        <Link
          href={tripDetail.back.href}
          className="inline-flex items-center gap-2 text-[13.5px] text-ink-subtle transition-colors hover:text-ink"
        >
          <ChevronLeft size={15} aria-hidden />
          {tripDetail.back.label}
        </Link>

        <div className="mt-5 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_372px]">
          <div className="flex flex-col gap-5">
            <HeadlineCard />
            <StopsCard />
            <UnitCard />
            <DocumentsCard />
            <ReputationCard />
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-[92px]">
            <CarrierCard />
            <RequestCard />
            <OtherTripsCard />
          </aside>
        </div>
      </main>

      <AppFooter width={WIDTH} />
    </div>
  );
}

function HeadlineCard() {
  return (
    <CardPanel className="p-6 sm:p-[30px]">
      <div className="flex flex-wrap items-center gap-2.5">
        <StatusBadge>{tripDetail.badges.featured}</StatusBadge>
        <span className="rounded-full border border-status-published-border bg-status-published-bg px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.14em] text-status-published-text uppercase">
          {tripDetail.badges.available}
        </span>
        <span className="text-[12.5px] text-ink-faint">{tripDetail.reference}</span>
      </div>

      <h1 className="mt-[18px] flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[clamp(2rem,7vw,44px)] leading-[1.02] font-black tracking-[-0.035em]">
        <span>{tripDetail.title.origin}</span>
        <RouteArrow width={34} />
        <span>{tripDetail.title.destination}</span>
      </h1>

      <p className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] text-ink-subtle">
        {tripDetail.meta.map((item, index) => (
          <span key={item} className="flex items-center gap-2.5">
            {item}
            {index < tripDetail.meta.length - 1 ? (
              <span aria-hidden className="text-line-control-hover">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-subtle bg-line-subtle md:grid-cols-4">
        {tripDetail.metrics.map((metric) => (
          <div key={metric.id} className="bg-surface-sunken p-[18px]">
            <dt className="text-[11.5px] text-ink-faint">{metric.label}</dt>
            <dd
              className={cn(
                "m-0 mt-1 font-display text-2xl font-extrabold tracking-[-0.02em]",
                "accent" in metric && metric.accent && "text-brand"
              )}
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </CardPanel>
  );
}

function StopsCard() {
  return (
    <CardPanel className="p-6 sm:p-[30px]">
      <CardEyebrow>{tripDetail.stops.eyebrow}</CardEyebrow>
      <StopTimeline stops={tripDetail.stops.items} />
    </CardPanel>
  );
}

function UnitCard() {
  const { unit } = tripDetail;

  return (
    <CardPanel className="p-6 sm:p-[30px]">
      <CardEyebrow>{unit.eyebrow}</CardEyebrow>

      <div className="mt-[22px] grid grid-cols-1 gap-x-[26px] gap-y-7 md:grid-cols-2">
        <dl className="flex flex-col gap-3.5">
          {unit.rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 text-[14.5px]">
              <dt className="text-ink-faint">{row.label}</dt>
              <dd className="m-0 text-right font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <div className="mb-3 text-[13px] text-ink-faint">{unit.acceptsLabel}</div>
          <div className="flex flex-wrap gap-2">
            {unit.accepts.map((item) => (
              <TagPill key={item}>{item}</TagPill>
            ))}
          </div>

          <div className="mt-[18px] mb-3 text-[13px] text-ink-faint">{unit.rejectsLabel}</div>
          <div className="flex flex-wrap gap-2">
            {unit.rejects.map((item) => (
              <TagPill key={item} tone="muted">
                {item}
              </TagPill>
            ))}
          </div>
        </div>
      </div>
    </CardPanel>
  );
}

function DocumentsCard() {
  const { documents } = tripDetail;

  return (
    <CardPanel className="p-6 sm:p-[30px]">
      <CardEyebrow>{documents.eyebrow}</CardEyebrow>
      <ul className="mt-5 grid grid-cols-1 gap-x-[26px] gap-y-3 md:grid-cols-2">
        {documents.items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "flex items-center gap-2.5 text-[14.5px]",
              item.ok ? "text-ink-muted" : "text-ink-subtle"
            )}
          >
            {item.ok ? <CheckIcon /> : <AlertIcon size={16} />}
            {item.label}
            <span className="ml-auto shrink-0 text-[13px] text-ink-faint">{item.meta}</span>
          </li>
        ))}
      </ul>
    </CardPanel>
  );
}

function ReputationCard() {
  const { reputation } = tripDetail;

  return (
    <CardPanel className="p-6 sm:p-[30px]">
      <CardHeader
        eyebrow={reputation.eyebrow}
        action={
          <InlineLink href={routes.searchTrucks} className="text-[13.5px]">
            {reputation.viewAll}
          </InlineLink>
        }
      />

      <dl className="mt-[22px] grid grid-cols-2 gap-[22px] md:grid-cols-4">
        {reputation.stats.map((stat) => (
          <div key={stat.id}>
            <dd
              className={cn(
                "m-0 font-display text-[28px] font-extrabold tracking-[-0.03em]",
                "accent" in stat && stat.accent && "text-brand"
              )}
            >
              {stat.value}
            </dd>
            <dt className="mt-1 text-[12.5px] text-ink-faint">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <ul className="mt-[26px] flex flex-col gap-3.5 border-t border-line-subtle pt-[22px]">
        {reputation.reviews.map((review) => (
          <li key={review.id}>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-sm font-semibold">{review.author}</span>
              <span className="text-[13px] text-brand">{review.rating}</span>
              <span className="ml-auto text-[12.5px] text-ink-ghost">{review.date}</span>
            </div>
            <p className="mt-1.5 text-sm leading-[1.55] text-ink-subtle">{review.body}</p>
          </li>
        ))}
      </ul>
    </CardPanel>
  );
}

function CarrierCard() {
  const { carrier } = tripDetail;

  return (
    <CardPanel className="p-6">
      <div className="flex items-center gap-3.5">
        <span
          aria-hidden
          className="flex size-[46px] shrink-0 items-center justify-center rounded-full border border-line-raised bg-surface-control font-display text-base font-bold text-brand"
        >
          {carrier.initials}
        </span>
        <div className="min-w-0">
          <div className="font-display text-lg font-bold tracking-[-0.02em]">{carrier.name}</div>
          <div className="text-[13px] text-ink-faint">{carrier.meta}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {carrier.tags.map((tag) => (
          <TagPill key={tag.label} tone={tag.tone as TagTone} className="text-xs font-semibold">
            {tag.label}
          </TagPill>
        ))}
      </div>

      <div className="mt-[18px] flex items-center gap-2.5 border-t border-line-subtle pt-4 text-[13.5px] text-ink-subtle">
        <Clock size={15} className="shrink-0 text-ink-faint" aria-hidden />
        {carrier.responseTime}
      </div>
    </CardPanel>
  );
}

function RequestCard() {
  const { request } = tripDetail;

  return (
    <CardPanel tone="warm" className="p-6">
      <CardEyebrow tone="brand">{request.eyebrow}</CardEyebrow>
      <p className="mt-3.5 text-sm leading-[1.6] text-ink-muted">{request.body}</p>

      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-line-warm bg-surface-sunken p-4">
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-ink-subtle">{request.feeLabel}</span>
          <span className="font-display text-[19px] font-extrabold">{request.feeValue}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-ink-subtle">{request.commissionLabel}</span>
          <span className="font-display text-[19px] font-extrabold text-status-published-text">
            {request.commissionValue}
          </span>
        </div>
        <p className="border-t border-line-subtle pt-2.5 text-[12.5px] leading-[1.5] text-ink-dim">
          {request.creditNote}
        </p>
      </div>

      <ActionButton block size="lg" className="mt-[18px]">
        {request.submit}
      </ActionButton>
      <ActionButton variant="outline" block size="md" className="mt-2.5">
        {request.secondary}
      </ActionButton>
      <p className="mt-3 text-center text-[12.5px] text-ink-dim">{request.footnote}</p>
    </CardPanel>
  );
}

function OtherTripsCard() {
  const { otherTrips } = tripDetail;

  return (
    <CardPanel className="p-[22px_24px]">
      <CardEyebrow>{otherTrips.eyebrow}</CardEyebrow>
      <ul className="mt-4 flex flex-col gap-3.5">
        {otherTrips.items.map((item) => (
          <li key={item.id}>
            <Link
              href={routes.trip(item.id)}
              className="flex items-center gap-2.5 text-[13.5px] text-ink-muted transition-colors hover:text-brand"
            >
              <DensityDot density={item.density} />
              {item.label}
              <span className="ml-auto text-ink-faint">{item.rating}</span>
            </Link>
          </li>
        ))}
      </ul>
    </CardPanel>
  );
}
