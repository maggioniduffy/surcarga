import { ActionButton, InlineLink } from "@/components/common/action";
import { CardEyebrow, CardHeader, CardPanel } from "@/components/common/card-panel";
import { EmptyState } from "@/components/common/empty-state";
import { StatusBadge } from "@/components/common/pills";
import { DataTable } from "@/components/dashboard/data-table";
import { PanelHeading } from "@/components/dashboard/panel-heading";
import { SpendChart } from "@/components/dashboard/spend-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import type {
  ListingItem,
  ShipperPanelData,
  SpendData,
} from "@/components/dashboard/panel-data";
import { dashboard } from "@/content/es";
import { cn } from "@/lib/utils";

const panel = dashboard.shipper;

export function ShipperPanel({
  name,
  data,
}: {
  name: string | null;
  data: ShipperPanelData;
}) {
  return (
    <div>
      <PanelHeading
        eyebrow={panel.eyebrow}
        eyebrowTone="brand"
        name={name}
        greeting={{
          lead: panel.greetingLead,
          tail: panel.greetingTail,
          fallback: panel.greetingFallback,
        }}
        summary={{
          lead: panel.summaryLead,
          tail: panel.summaryTail,
          count: data.activeListingCount,
          unit: panel.summaryUnit,
        }}
        cta={panel.cta}
      />

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {panel.stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={data.stats[stat.id] ?? null}
            featured={"featured" in stat && stat.featured}
          />
        ))}
      </div>

      <div className="mt-[22px] grid grid-cols-1 items-start gap-[22px] xl:grid-cols-[1fr_352px]">
        <div className="flex flex-col gap-[22px]">
          <ListingsCard items={data.listings} />
          <ShipmentsCard rows={data.shipments} />
        </div>

        <div className="flex flex-col gap-4">
          <SpendCard spend={data.spend} />
          <PackOfferCard offer={data.packOffer} />
          <NextExpiryCard expiry={data.nextExpiry} />
        </div>
      </div>
    </div>
  );
}

function ListingsCard({ items }: { items: readonly ListingItem[] }) {
  const { listings } = panel;

  return (
    <CardPanel className="p-6 sm:p-[26px]">
      <CardHeader
        eyebrow={listings.eyebrow}
        tone="brand"
        action={<InlineLink href={panel.cta.href}>{listings.viewAll}</InlineLink>}
      />

      {items.length === 0 ? (
        <EmptyState className="mt-5">{listings.empty}</EmptyState>
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <CardPanel
                tone={item.featured ? "warm" : "sunken"}
                className="flex flex-col gap-4 rounded-xl p-[18px_20px] lg:flex-row lg:items-center lg:gap-[18px]"
              >
                <div className="flex-1">
                  {item.badge ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <StatusBadge>{item.badge}</StatusBadge>
                      <span className="text-[12.5px] text-ink-dim">{item.meta}</span>
                    </div>
                  ) : (
                    <div className="text-[12.5px] text-ink-faint">{item.meta}</div>
                  )}
                  <div className="mt-2.5 font-display text-[17px] font-bold">{item.title}</div>
                  <div className="mt-1.5 text-[13.5px] text-ink-subtle">{item.detail}</div>
                </div>

                <div className="flex items-center gap-4 lg:gap-[18px]">
                  <div className="lg:text-right">
                    <div
                      className={cn(
                        "font-display text-[26px] leading-none font-extrabold tracking-[-0.03em]",
                        item.featured && "text-brand"
                      )}
                    >
                      {item.count}
                    </div>
                    <div className="mt-1 text-xs text-ink-dim">
                      {item.count === 1 ? listings.unit.one : listings.unit.many}
                    </div>
                  </div>

                  <ActionButton
                    variant={item.featured ? "primary" : "outline"}
                    className="ml-auto"
                  >
                    {item.featured ? listings.actions.primary : listings.actions.secondary}
                  </ActionButton>
                </div>
              </CardPanel>
            </li>
          ))}
        </ul>
      )}
    </CardPanel>
  );
}

function ShipmentsCard({ rows }: { rows: ShipperPanelData["shipments"] }) {
  const { shipments } = panel;

  return (
    <CardPanel className="p-6 sm:p-[26px]">
      <CardHeader
        eyebrow={shipments.eyebrow}
        action={<InlineLink href={panel.cta.href}>{shipments.viewAll}</InlineLink>}
      />
      <DataTable
        caption={shipments.eyebrow}
        columns={shipments.columns}
        rows={rows}
        widths={["36%", "26%", "18%", "20%"]}
        empty={shipments.empty}
      />
    </CardPanel>
  );
}

function SpendCard({ spend }: { spend: SpendData | null }) {
  const copy = panel.spend;

  return (
    <CardPanel className="p-6">
      <CardEyebrow>{copy.eyebrow}</CardEyebrow>

      {!spend ? (
        <EmptyState className="mt-3.5">{copy.empty}</EmptyState>
      ) : (
        <>
          <div className="mt-3.5 flex items-baseline gap-2.5">
            <span className="font-display text-[30px] font-extrabold tracking-[-0.03em]">
              {spend.total}
            </span>
            <span className="text-[13px] text-ink-faint">{spend.period}</span>
          </div>

          <SpendChart
            label={copy.chartLabel}
            bars={spend.bars}
            axisStart={spend.axisStart}
            axisEnd={spend.axisEnd}
          />

          <dl className="mt-[18px] flex flex-col gap-2.5 border-t border-line-subtle pt-4 text-[13.5px]">
            {spend.breakdown.map((row) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt className="text-ink-faint">{row.label}</dt>
                <dd className={cn("m-0", row.positive && "text-status-published-text")}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </CardPanel>
  );
}

function PackOfferCard({ offer }: { offer: ShipperPanelData["packOffer"] }) {
  const copy = panel.packOffer;

  return (
    <CardPanel tone={offer ? "warm" : "sunken"} className="p-[22px_24px]">
      <CardEyebrow tone={offer ? "brand" : "muted"}>{copy.eyebrow}</CardEyebrow>
      {!offer ? (
        <EmptyState className="mt-3">{copy.empty}</EmptyState>
      ) : (
        <>
          <p className="mt-3 text-sm leading-[1.6] text-ink-muted">{offer.body}</p>
          <ActionButton block size="md" className="mt-4 py-3">
            {offer.cta}
          </ActionButton>
        </>
      )}
    </CardPanel>
  );
}

function NextExpiryCard({ expiry }: { expiry: ShipperPanelData["nextExpiry"] }) {
  const copy = panel.nextExpiry;

  return (
    <CardPanel tone="sunken" className="p-[22px_24px]">
      <CardEyebrow>{copy.eyebrow}</CardEyebrow>
      {!expiry ? (
        <EmptyState className="mt-3">{copy.empty}</EmptyState>
      ) : (
        <>
          <div className="mt-3 text-sm font-semibold">{expiry.title}</div>
          <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-subtle">{expiry.body}</p>
        </>
      )}
    </CardPanel>
  );
}
