"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { AppFooter } from "@/components/app-shell/app-footer";
import { AppHeader } from "@/components/app-shell/app-header";
import { ActionButton, InlineLink } from "@/components/common/action";
import { CardEyebrow, CardPanel } from "@/components/common/card-panel";
import { FormSteps, IntroBadge, PageIntro } from "@/components/common/form-steps";
import { CheckIcon } from "@/components/common/icons";
import { RouteHeadline } from "@/components/common/route-arrow";
import { TierPicker } from "@/components/cargo/tier-picker";
import { CheckboxField } from "@/components/forms/checkbox-field";
import { SelectField } from "@/components/forms/select-field";
import { TextField, TextareaField } from "@/components/forms/text-field";
import { appShell, publishCargo } from "@/content/es";
import { routes } from "@/lib/routes";

const WIDTH = "1160px";
const TAX_RATE = 0.21;

function formatUsd(amount: number) {
  return `USD ${amount.toFixed(2)}`;
}

export function PublishCargoView() {
  const [tierId, setTierId] = useState<string>(publishCargo.tiers.options[0].id);
  const tier =
    publishCargo.tiers.options.find((option) => option.id === tierId) ??
    publishCargo.tiers.options[0];

  const tax = Math.round(tier.fee * TAX_RATE * 100) / 100;
  const total = tier.fee + tax;

  return (
    <div className="flex flex-1 flex-col bg-surface-base">
      <AppHeader
        width={WIDTH}
        nav={appShell.nav.shipper}
        activeHref={routes.publishCargo}
        user={publishCargo.user}
      />

      <main
        className="mx-auto w-full flex-1 px-6 pt-8 pb-20 sm:px-8"
        style={{ maxWidth: WIDTH }}
      >
        <PageIntro
          badge={<IntroBadge tone="brand">{publishCargo.badge}</IntroBadge>}
          title={publishCargo.title}
          subtitle={publishCargo.subtitle}
          steps={<FormSteps label={publishCargo.title} steps={publishCargo.steps} />}
        />

        <div className="mt-9 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_356px]">
          <div className="flex flex-col gap-5">
            <CargoCard />
            <RouteCard />
            <RequirementsCard />

            <CardPanel className="p-6 sm:p-[28px_30px]">
              <CardEyebrow tone="brand">{publishCargo.tiers.eyebrow}</CardEyebrow>
              <p className="mt-3 text-sm text-ink-faint">{publishCargo.tiers.intro}</p>
              <div className="mt-5">
                <TierPicker
                  label={publishCargo.tiers.eyebrow}
                  options={publishCargo.tiers.options}
                  value={tierId}
                  onChange={setTierId}
                />
              </div>
            </CardPanel>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-[92px]">
            <SummaryCard
              tierName={tier.summaryName}
              visibility={tier.visibility}
              fee={formatUsd(tier.fee)}
              tax={formatUsd(tax)}
              total={formatUsd(total)}
            />
            <UsageCard />
          </aside>
        </div>
      </main>

      <AppFooter width={WIDTH} />
    </div>
  );
}

function CargoCard() {
  const { cargo } = publishCargo;

  return (
    <CardPanel className="p-6 sm:p-[28px_30px]">
      <CardEyebrow tone="brand">{cargo.eyebrow}</CardEyebrow>

      <div className="mt-[22px]">
        <TextField
          id="cargo-description"
          label={cargo.description.label}
          defaultValue={cargo.description.value}
        />
      </div>

      <div className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <SelectField
          id="cargo-type"
          label={cargo.type.label}
          options={cargo.type.options}
          defaultValue={cargo.type.value}
        />
        <TextField
          id="cargo-packages"
          label={cargo.packages.label}
          defaultValue={cargo.packages.value}
        />
      </div>

      <div className="mt-[18px] grid grid-cols-2 gap-3.5 border-t border-line-subtle pt-[22px] sm:grid-cols-4">
        {cargo.dimensions.map((dimension) => (
          <TextField
            key={dimension.id}
            id={`cargo-${dimension.id}`}
            label={dimension.label}
            defaultValue={dimension.value}
          />
        ))}
      </div>

      <p className="mt-[18px] flex items-start gap-3 text-[13.5px] text-ink-subtle">
        <CheckIcon className="mt-0.5" />
        <span>
          {cargo.matchHintLead}
          <span className="font-semibold text-ink">{cargo.matchHintCount}</span>
          {cargo.matchHintTail}
        </span>
      </p>
    </CardPanel>
  );
}

function RouteCard() {
  const { route } = publishCargo;

  return (
    <CardPanel className="p-6 sm:p-[28px_30px]">
      <CardEyebrow tone="brand">{route.eyebrow}</CardEyebrow>

      <div className="mt-[22px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <SelectField
          id="cargo-origin"
          label={route.origin.label}
          options={route.origin.options}
          defaultValue={route.origin.value}
        />
        <SelectField
          id="cargo-destination"
          label={route.destination.label}
          options={route.destination.options}
          defaultValue={route.destination.value}
        />
      </div>

      <div className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-3">
        <TextField
          id="cargo-ready-at"
          type="date"
          label={route.readyAt.label}
          defaultValue={route.readyAt.value}
        />
        <TextField
          id="cargo-deliver-by"
          type="date"
          label={route.deliverBy.label}
          defaultValue={route.deliverBy.value}
        />
        <SelectField
          id="cargo-window"
          label={route.window.label}
          options={route.window.options}
          defaultValue={route.window.value}
          compact
        />
      </div>
    </CardPanel>
  );
}

function RequirementsCard() {
  const { requirements } = publishCargo;

  return (
    <CardPanel className="p-6 sm:p-[28px_30px]">
      <CardEyebrow tone="brand">{requirements.eyebrow}</CardEyebrow>

      <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {requirements.options.map((option) => (
          <CheckboxField
            key={option.id}
            id={`cargo-req-${option.id}`}
            label={option.label}
            defaultChecked={option.checked}
          />
        ))}
      </div>

      <div className="mt-[22px] border-t border-line-subtle pt-[22px]">
        <TextareaField
          id="cargo-notes"
          label={requirements.notes.label}
          hint={requirements.notes.optional}
          placeholder={requirements.notes.placeholder}
        />
      </div>
    </CardPanel>
  );
}

function SummaryCard({
  tierName,
  visibility,
  fee,
  tax,
  total,
}: {
  tierName: string;
  visibility: string;
  fee: string;
  tax: string;
  total: string;
}) {
  const { summary } = publishCargo;

  return (
    <CardPanel tone="warm" className="p-6">
      <CardEyebrow tone="brand">{summary.eyebrow}</CardEyebrow>

      <RouteHeadline
        origin={summary.origin}
        destination={summary.destination}
        className="mt-[18px] font-display text-[19px] font-extrabold tracking-[-0.02em]"
      />

      <dl className="mt-[18px] flex flex-col gap-3 border-t border-line-warm pt-4 text-sm">
        {summary.rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <dt className="text-ink-subtle">{row.label}</dt>
            <dd className="m-0 text-right">{row.value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4">
          <dt className="text-ink-subtle">{summary.tierLabel}</dt>
          <dd className="m-0 text-right">{tierName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-subtle">{summary.visibilityLabel}</dt>
          <dd className="m-0 text-right">{visibility}</dd>
        </div>
      </dl>

      <div className="mt-[18px] flex flex-col gap-3 rounded-xl border border-line-warm bg-surface-sunken p-4">
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-ink-subtle">{summary.feeLabel}</span>
          <span className="font-display text-[19px] font-extrabold">{fee}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-ink-subtle">{summary.taxLabel}</span>
          <span className="font-display text-[15px] font-bold text-ink-muted">{tax}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-ink-subtle">{summary.commissionLabel}</span>
          <span className="font-display text-[17px] font-extrabold text-status-published-text">
            {summary.commissionValue}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3 border-t border-line-subtle pt-3">
          <span className="text-sm font-semibold">{summary.totalLabel}</span>
          <span className="font-display text-[26px] font-black tracking-[-0.03em] text-brand">
            {total}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        <div className="text-[12.5px] text-ink-subtle">{summary.paymentMethodLabel}</div>
        <div className="flex items-center gap-3 rounded-[10px] border border-line-raised bg-surface-raised px-3.5 py-3">
          <CreditCard size={20} className="shrink-0 text-ink-subtle" aria-hidden />
          <span className="text-[13.5px] text-ink-muted">{summary.paymentMethod}</span>
          <InlineLink href={routes.dashboard} className="ml-auto text-[12.5px]">
            {summary.changePayment}
          </InlineLink>
        </div>
      </div>

      <ActionButton block size="lg" className="mt-[18px]">
        {summary.submitLead}
        {total}
        {summary.submitTail}
      </ActionButton>
      <ActionButton variant="outline" block size="md" className="mt-2.5">
        {summary.saveDraft}
      </ActionButton>

      <p className="mt-3 text-[12.5px] leading-[1.55] text-ink-dim">{summary.creditNote}</p>
    </CardPanel>
  );
}

function UsageCard() {
  const { usage } = publishCargo;

  return (
    <CardPanel tone="sunken" className="p-[22px_24px]">
      <CardEyebrow>{usage.eyebrow}</CardEyebrow>
      <div className="mt-3.5 flex flex-wrap items-baseline gap-2.5">
        <span className="font-display text-[26px] font-extrabold tracking-[-0.03em]">
          {usage.total}
        </span>
        <span className="text-[13px] text-ink-faint">{usage.detail}</span>
      </div>
      <p className="mt-4 border-t border-line-subtle pt-3.5 text-[13px] leading-[1.55] text-ink-subtle">
        {usage.body}{" "}
        <InlineLink href={routes.dashboard} className="text-[13px]">
          {usage.cta}
        </InlineLink>
      </p>
    </CardPanel>
  );
}
