"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { ActionButton } from "@/components/common/action";
import { CardEyebrow, CardPanel } from "@/components/common/card-panel";
import { CheckboxField } from "@/components/forms/checkbox-field";
import { ChipToggle } from "@/components/forms/chip-toggle";
import { Field } from "@/components/forms/field";
import { RangeField } from "@/components/forms/range-field";
import { SelectControl } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";
import { searchTrucks } from "@/content/es";

const { filters } = searchTrucks;

const initialTypes = Object.fromEntries(
  filters.cargoTypes.options.map((option) => [option.id, option.selected])
);

/** Search filters. Sticky rail from `lg` up; a collapsible panel below that. */
export function FilterSidebar() {
  const [capacity, setCapacity] = useState<number>(filters.capacity.value);
  const [types, setTypes] = useState<Record<string, boolean>>(initialTypes);

  return (
    <CardPanel className="p-[22px] lg:sticky lg:top-[94px]">
      <div className="flex items-center justify-between gap-3">
        <CardEyebrow>{filters.title}</CardEyebrow>
        <button
          type="button"
          className="cursor-pointer text-[12.5px] font-semibold text-brand transition-colors hover:text-brand-link-hover"
        >
          {filters.clear}
        </button>
      </div>

      <div className="mt-[22px]">
        <Field label={filters.destination.label} htmlFor="filter-destination">
          <SelectControl
            id="filter-destination"
            label={filters.destination.label}
            options={filters.destination.options}
            defaultValue={filters.destination.value}
            icon={<MapPin size={15} aria-hidden />}
            compact
          />
        </Field>
      </div>

      <div className="mt-[18px]">
        <Field label={filters.origin.label} htmlFor="filter-origin">
          <SelectControl
            id="filter-origin"
            label={filters.origin.label}
            options={filters.origin.options}
            defaultValue={filters.origin.value}
            compact
          />
        </Field>
      </div>

      <fieldset className="mt-[18px] min-w-0 border-0 p-0">
        <legend className="mb-2 text-[12.5px] text-ink-subtle">{filters.dates.label}</legend>
        {/* The rail is only 272px wide, so the range stacks there and pairs up
            in the full-width collapsible panel on smaller viewports. */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
          <TextField
            id="filter-from"
            type="date"
            compact
            label={filters.dates.fromLabel}
            defaultValue={filters.dates.from}
          />
          <TextField
            id="filter-to"
            type="date"
            compact
            label={filters.dates.toLabel}
            defaultValue={filters.dates.to}
          />
        </div>
      </fieldset>

      <div className="mt-[22px] border-t border-line-subtle pt-5">
        <div className="mb-3 text-[12.5px] text-ink-subtle">{filters.cargoTypes.label}</div>
        <div className="flex flex-wrap gap-2">
          {filters.cargoTypes.options.map((option) => (
            <ChipToggle
              key={option.id}
              shape="pill"
              label={option.label}
              selected={Boolean(types[option.id])}
              onToggle={() => setTypes((prev) => ({ ...prev, [option.id]: !prev[option.id] }))}
            />
          ))}
        </div>
      </div>

      <RangeField
        id="filter-capacity"
        size="sm"
        className="mt-[22px] border-t border-line-subtle pt-5"
        label={filters.capacity.label}
        valueLabel={`${capacity} m`}
        min={filters.capacity.min}
        max={filters.capacity.max}
        value={capacity}
        onValueChange={setCapacity}
        minLabel={filters.capacity.minLabel}
        maxLabel={filters.capacity.maxLabel}
      />

      <div className="mt-[22px] flex flex-col gap-3 border-t border-line-subtle pt-5">
        {filters.toggles.map((toggle) => (
          <CheckboxField
            key={toggle.id}
            id={`filter-${toggle.id}`}
            label={toggle.label}
            defaultChecked={toggle.checked}
          />
        ))}
      </div>

      <ActionButton block size="md" className="mt-6 py-3">
        {filters.apply}
      </ActionButton>
    </CardPanel>
  );
}
