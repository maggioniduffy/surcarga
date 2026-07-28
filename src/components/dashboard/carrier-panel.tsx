import { ActionButton, ActionLink, InlineLink } from "@/components/common/action";
import { CardHeader, CardPanel, CardEyebrow } from "@/components/common/card-panel";
import { AlertIcon } from "@/components/common/icons";
import { DensityDot, StatusBadge } from "@/components/common/pills";
import { DataTable } from "@/components/dashboard/data-table";
import { PanelHeading } from "@/components/dashboard/panel-heading";
import { StatCard } from "@/components/dashboard/stat-card";
import { dashboard } from "@/content/es";
import { cn } from "@/lib/utils";

const panel = dashboard.carrier;

export function CarrierPanel() {
  return (
    <div>
      <PanelHeading
        eyebrow={panel.eyebrow}
        eyebrowTone="published"
        greeting={panel.greeting}
        summaryLead={panel.summaryLead}
        summaryHighlight={panel.summaryHighlight}
        summaryTail={panel.summaryTail}
        cta={panel.cta}
      />

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {panel.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-[22px] grid grid-cols-1 items-start gap-[22px] xl:grid-cols-[1fr_352px]">
        <div className="flex flex-col gap-[22px]">
          <RequestsCard />
          <TripsCard />
        </div>

        <div className="flex flex-col gap-4">
          <AvailableCargoCard />
          <HistoryCard />
          <AccessNotice />
        </div>
      </div>
    </div>
  );
}

function RequestsCard() {
  const { requests } = panel;

  return (
    <CardPanel className="p-6 sm:p-[26px]">
      <CardHeader
        eyebrow={requests.eyebrow}
        tone="brand"
        action={<InlineLink href={panel.cta.href}>{requests.viewAll}</InlineLink>}
      />

      <ul className="mt-5 flex flex-col gap-3">
        {requests.items.map((item) => (
          <li key={item.id}>
            <CardPanel
              tone={item.urgent ? "warm" : "sunken"}
              className="flex flex-col gap-4 rounded-xl p-[18px_20px] lg:flex-row lg:items-center lg:gap-[18px]"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  {item.badge ? <StatusBadge>{item.badge}</StatusBadge> : null}
                  <span className="text-[12.5px] text-ink-dim">{item.meta}</span>
                </div>
                <div className="mt-2.5 font-display text-[17px] font-bold">{item.title}</div>
                <div className="mt-1.5 text-[13.5px] text-ink-subtle">{item.detail}</div>
              </div>

              <div className="flex shrink-0 gap-2.5">
                <ActionButton variant="quiet">{requests.actions.reject}</ActionButton>
                {item.urgent ? (
                  <ActionButton>{requests.actions.accept}</ActionButton>
                ) : (
                  <ActionButton variant="outline">{requests.actions.detail}</ActionButton>
                )}
              </div>
            </CardPanel>
          </li>
        ))}
      </ul>
    </CardPanel>
  );
}

function TripsCard() {
  const { trips } = panel;

  return (
    <CardPanel className="p-6 sm:p-[26px]">
      <CardHeader
        eyebrow={trips.eyebrow}
        action={<InlineLink href={panel.cta.href}>{trips.viewAll}</InlineLink>}
      />
      <DataTable
        caption={trips.eyebrow}
        columns={trips.columns}
        rows={trips.rows}
        widths={["40%", "20%", "20%", "20%"]}
      />
    </CardPanel>
  );
}

function AvailableCargoCard() {
  const { availableCargo } = panel;

  return (
    <CardPanel className="p-6">
      <CardEyebrow>{availableCargo.eyebrow}</CardEyebrow>
      <ul className="mt-[18px] flex flex-col gap-3.5">
        {availableCargo.items.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5 text-[13.5px]">
            <DensityDot density={item.density} />
            <span className="text-ink-muted">{item.label}</span>
            <span className="ml-auto text-ink-faint">{item.value}</span>
          </li>
        ))}
      </ul>
      <ActionLink href={availableCargo.cta.href} variant="outline" block className="mt-5 py-[11px]">
        {availableCargo.cta.label}
      </ActionLink>
    </CardPanel>
  );
}

function HistoryCard() {
  const { history } = panel;

  return (
    <CardPanel className="p-6">
      <CardEyebrow>{history.eyebrow}</CardEyebrow>
      <ul className="mt-[18px] flex flex-col gap-[15px]">
        {history.items.map((item) => (
          <li key={item.id}>
            <div className="flex items-center gap-2.5 text-[13.5px]">
              <span className="font-semibold text-ink-muted">{item.route}</span>
              <span className="ml-auto text-brand">{item.rating}</span>
            </div>
            <div className="mt-1 text-[12.5px] text-ink-faint">{item.meta}</div>
          </li>
        ))}
      </ul>
    </CardPanel>
  );
}

function AccessNotice() {
  const { notice } = panel;

  return (
    <CardPanel tone="warning" className={cn("p-[22px_24px]")}>
      <div className="flex items-start gap-3">
        <AlertIcon className="mt-px" />
        <div>
          <div className="text-sm font-semibold">{notice.title}</div>
          <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-subtle">{notice.body}</p>
          <InlineLink href={panel.cta.href} className="mt-2.5 inline-block text-[13.5px]">
            {notice.cta}
          </InlineLink>
        </div>
      </div>
    </CardPanel>
  );
}
