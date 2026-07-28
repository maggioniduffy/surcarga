"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AppFooter } from "@/components/app-shell/app-footer";
import { AppHeader } from "@/components/app-shell/app-header";
import { ActionButton, InlineLink } from "@/components/common/action";
import { CardEyebrow, CardPanel } from "@/components/common/card-panel";
import { FormSteps, IntroBadge, PageIntro } from "@/components/common/form-steps";
import { CheckIcon, WarningNote } from "@/components/common/icons";
import { RouteHeadline } from "@/components/common/route-arrow";
import { CheckboxField } from "@/components/forms/checkbox-field";
import { ChipToggle } from "@/components/forms/chip-toggle";
import { RangeField } from "@/components/forms/range-field";
import { SelectField } from "@/components/forms/select-field";
import { TextField, TextareaField } from "@/components/forms/text-field";
import { appShell, publishTrip } from "@/content/es";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const WIDTH = "1160px";

const initialTypes = Object.fromEntries(
  publishTrip.accepted.options.map((option) => [option.id, option.selected])
);

function formatMeters(value: number) {
  return `${String(value).replace(".", ",")} m`;
}

export function PublishTripView() {
  const [recurring, setRecurring] = useState(true);
  const [meters, setMeters] = useState<number>(publishTrip.capacity.meters.value);
  const [types, setTypes] = useState<Record<string, boolean>>(initialTypes);

  const selectedCount = Object.values(types).filter(Boolean).length;

  return (
    <div className="flex flex-1 flex-col bg-surface-base">
      <AppHeader
        width={WIDTH}
        nav={appShell.nav.carrier}
        activeHref={routes.publishTrip}
        user={publishTrip.user}
      />

      <main
        className="mx-auto w-full flex-1 px-6 pt-8 pb-20 sm:px-8"
        style={{ maxWidth: WIDTH }}
      >
        <PageIntro
          badge={<IntroBadge tone="published">{publishTrip.badge}</IntroBadge>}
          title={publishTrip.title}
          subtitle={publishTrip.subtitle}
          steps={<FormSteps label={publishTrip.title} steps={publishTrip.steps} />}
        />

        <div className="mt-9 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_344px]">
          <div className="flex flex-col gap-5">
            <RouteCard recurring={recurring} onRecurringChange={setRecurring} />
            <CapacityCard meters={meters} onMetersChange={setMeters} />
            <AcceptedCargoCard
              types={types}
              onToggle={(id) => setTypes((prev) => ({ ...prev, [id]: !prev[id] }))}
            />
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-[92px]">
            <PreviewCard meters={meters} selectedCount={selectedCount} />
            <FreeCard />
            <WaitingCargoCard />
          </aside>
        </div>
      </main>

      <AppFooter width={WIDTH} />
    </div>
  );
}

function RouteCard({
  recurring,
  onRecurringChange,
}: {
  recurring: boolean;
  onRecurringChange: (value: boolean) => void;
}) {
  const { route } = publishTrip;

  return (
    <CardPanel className="p-6 sm:p-[28px_30px]">
      <CardEyebrow tone="brand">{route.eyebrow}</CardEyebrow>

      <div className="mt-[22px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <SelectField
          id="trip-origin"
          label={route.origin.label}
          options={route.origin.options}
          defaultValue={route.origin.value}
        />
        <SelectField
          id="trip-destination"
          label={route.destination.label}
          options={route.destination.options}
          defaultValue={route.destination.value}
        />
      </div>

      <div className="mt-[18px]">
        <div className="mb-2 text-[13px] text-ink-subtle">
          {route.stops.label}
          <span className="ml-1 text-ink-ghost">{route.stops.optional}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {route.stops.items.map((stop) => (
            <span
              key={stop.id}
              className="inline-flex items-center gap-2 rounded-lg border border-line-warm-raised bg-surface-warm-raised px-3 py-2.5 text-[13.5px] font-semibold text-brand"
            >
              {stop.label}
              <button
                type="button"
                aria-label={`${route.stops.remove}: ${stop.label}`}
                className="cursor-pointer text-[#8a4a28] transition-colors hover:text-brand"
              >
                <X size={13} aria-hidden />
              </button>
            </span>
          ))}
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-dashed border-line-control px-3.5 py-2.5 text-[13.5px] text-ink-subtle transition-colors hover:border-line-control-hover hover:text-ink"
          >
            {route.stops.add}
          </button>
        </div>
      </div>

      <div className="mt-[22px] grid grid-cols-1 gap-[18px] border-t border-line-subtle pt-[22px] sm:grid-cols-3">
        <TextField
          id="trip-date"
          type="date"
          label={route.departureDate.label}
          defaultValue={route.departureDate.value}
        />
        <TextField
          id="trip-time"
          type="time"
          label={route.departureTime.label}
          defaultValue={route.departureTime.value}
        />
        <SelectField
          id="trip-flexibility"
          label={route.flexibility.label}
          options={route.flexibility.options}
          defaultValue={route.flexibility.value}
          compact
        />
      </div>

      <CheckboxField
        id="trip-recurring"
        label={route.recurring.label}
        checked={recurring}
        onCheckedChange={onRecurringChange}
        className="mt-5"
      />

      {recurring ? (
        <div className="mt-3.5 flex flex-wrap gap-2">
          {route.recurring.days.map((day) => (
            <span
              key={day.id}
              className={cn(
                "rounded-lg border px-3 py-2 text-[13px] font-semibold",
                day.active
                  ? "border-line-warm-raised bg-surface-warm-raised text-brand"
                  : "border-line-raised bg-surface-control text-ink-faint"
              )}
            >
              {day.label}
            </span>
          ))}
        </div>
      ) : null}
    </CardPanel>
  );
}

function CapacityCard({
  meters,
  onMetersChange,
}: {
  meters: number;
  onMetersChange: (value: number) => void;
}) {
  const { capacity } = publishTrip;

  return (
    <CardPanel className="p-6 sm:p-[28px_30px]">
      <CardEyebrow tone="brand">{capacity.eyebrow}</CardEyebrow>

      <div className="mt-[22px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <SelectField
          id="trip-unit"
          label={capacity.unit.label}
          options={capacity.unit.options}
          defaultValue={capacity.unit.value}
        />
        <TextField
          id="trip-weight"
          label={capacity.weight.label}
          defaultValue={capacity.weight.value}
          suffix={capacity.weight.suffix}
        />
      </div>

      <RangeField
        id="trip-meters"
        className="mt-6"
        label={capacity.meters.label}
        valueLabel={formatMeters(meters)}
        min={capacity.meters.min}
        max={capacity.meters.max}
        step={capacity.meters.step}
        value={meters}
        onValueChange={onMetersChange}
        minLabel={capacity.meters.minLabel}
        maxLabel={capacity.meters.maxLabel}
      />

      <div className="mt-6 grid grid-cols-1 gap-[18px] border-t border-line-subtle pt-[22px] sm:grid-cols-2">
        <SelectField
          id="trip-loading"
          label={capacity.loading.label}
          options={capacity.loading.options}
          defaultValue={capacity.loading.value}
        />
        <TextField
          id="trip-height"
          label={capacity.height.label}
          defaultValue={capacity.height.value}
          suffix={capacity.height.suffix}
        />
      </div>
    </CardPanel>
  );
}

function AcceptedCargoCard({
  types,
  onToggle,
}: {
  types: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const { accepted } = publishTrip;

  return (
    <CardPanel className="p-6 sm:p-[28px_30px]">
      <CardEyebrow tone="brand">{accepted.eyebrow}</CardEyebrow>
      <p className="mt-3 text-sm text-ink-faint">{accepted.intro}</p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {accepted.options.map((option) => (
          <ChipToggle
            key={option.id}
            label={option.label}
            selected={Boolean(types[option.id])}
            onToggle={() => onToggle(option.id)}
          />
        ))}
      </div>

      <WarningNote className="mt-[22px]">
        {accepted.warning}{" "}
        <InlineLink href={routes.dashboard} className="text-[13.5px]">
          {accepted.warningCta}
        </InlineLink>
      </WarningNote>

      <div className="mt-[22px] border-t border-line-subtle pt-[22px]">
        <TextareaField
          id="trip-notes"
          label={accepted.notes.label}
          hint={accepted.notes.optional}
          placeholder={accepted.notes.placeholder}
        />
      </div>
    </CardPanel>
  );
}

function PreviewCard({ meters, selectedCount }: { meters: number; selectedCount: number }) {
  const { preview } = publishTrip;

  return (
    <CardPanel className="p-6">
      <CardEyebrow>{preview.eyebrow}</CardEyebrow>
      <RouteHeadline
        origin={preview.origin}
        destination={preview.destination}
        className="mt-[18px] font-display text-[19px] font-extrabold tracking-[-0.02em]"
      />
      <div className="mt-2 text-[13.5px] text-ink-subtle">{preview.schedule}</div>

      <div className="mt-[18px] grid grid-cols-2 gap-3 border-t border-line-subtle pt-4">
        <div>
          <div className="text-[11.5px] text-ink-faint">{preview.spaceLabel}</div>
          <div className="mt-1 font-display text-lg font-extrabold">
            {formatMeters(meters)}
            {preview.spaceSuffix}
          </div>
        </div>
        <div>
          <div className="text-[11.5px] text-ink-faint">{preview.typesLabel}</div>
          <div className="mt-1 font-display text-lg font-extrabold">
            {selectedCount}
            {preview.typesSuffix}
          </div>
        </div>
      </div>
    </CardPanel>
  );
}

function FreeCard() {
  const { free } = publishTrip;

  return (
    <div
      className="rounded-2xl border border-status-published-border p-6"
      style={{
        background:
          "linear-gradient(180deg, var(--color-status-published-bg), var(--color-surface-sunken))",
      }}
    >
      <div className="flex items-center gap-2.5">
        <CheckIcon size={17} />
        <span className="font-display text-[17px] font-extrabold">{free.title}</span>
      </div>
      <p className="mt-3 text-sm leading-[1.6] text-ink-subtle">{free.body}</p>
      <ActionButton block size="lg" className="mt-5">
        {free.submit}
      </ActionButton>
      <ActionButton variant="outline" block size="md" className="mt-2.5">
        {free.saveDraft}
      </ActionButton>
    </div>
  );
}

function WaitingCargoCard() {
  const { waitingCargo } = publishTrip;

  return (
    <CardPanel tone="sunken" className="p-[22px_24px]">
      <CardEyebrow>{waitingCargo.eyebrow}</CardEyebrow>
      <ul className="mt-4 flex flex-col gap-3.5">
        {waitingCargo.items.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5 text-[13.5px]">
            <span className="text-ink-muted">{item.label}</span>
            <span
              className={cn(
                "ml-auto",
                item.urgent ? "font-semibold text-brand" : "text-ink-faint"
              )}
            >
              {item.meta}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-line-subtle pt-3.5 text-[13px] text-ink-faint">
        {waitingCargo.footnote}
      </p>
    </CardPanel>
  );
}
