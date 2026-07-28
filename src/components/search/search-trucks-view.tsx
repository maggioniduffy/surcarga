"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { AppFooter } from "@/components/app-shell/app-footer";
import { AppHeader } from "@/components/app-shell/app-header";
import { ActionButton, ActionLink } from "@/components/common/action";
import { CardEyebrow, CardPanel } from "@/components/common/card-panel";
import { DensityDot } from "@/components/common/pills";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { RegionMap } from "@/components/search/region-map";
import { TripResultCard } from "@/components/search/trip-result-card";
import { SelectControl } from "@/components/forms/select-field";
import { appShell, searchTrucks } from "@/content/es";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const WIDTH = "1440px";
const { filters, results, map } = searchTrucks;

type View = "list" | "map";

export function SearchTrucksView() {
  const [view, setView] = useState<View>("list");
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col bg-surface-base">
      <AppHeader
        width={WIDTH}
        nav={appShell.nav.shipper}
        activeHref={routes.searchTrucks}
        user={searchTrucks.user}
        actions={
          <ActionLink href={searchTrucks.headerCta.href} className="hidden sm:inline-flex">
            {searchTrucks.headerCta.label}
          </ActionLink>
        }
      />

      <div
        className="mx-auto grid w-full flex-1 grid-cols-1 items-start gap-6 px-6 py-7 sm:px-8 lg:grid-cols-[272px_1fr]"
        style={{ maxWidth: WIDTH }}
      >
        <button
          type="button"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((open) => !open)}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-line-control px-4 py-3 font-display text-sm font-bold text-ink transition-colors hover:border-line-control-hover lg:hidden"
        >
          <SlidersHorizontal size={16} aria-hidden />
          {filters.openLabel}
        </button>

        <div className={cn(filtersOpen ? "block" : "hidden", "lg:block")}>
          <FilterSidebar />
        </div>

        <main className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="font-display text-[clamp(1.75rem,5vw,34px)] font-extrabold tracking-[-0.03em]">
                {results.title}
              </h1>
              <p className="mt-2 text-[14.5px] text-ink-subtle">
                <span className="font-semibold text-ink">{results.countLead}</span>
                {results.countTail}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SelectControl
                id="sort-results"
                label={results.sort.label}
                options={results.sort.options}
                defaultValue={results.sort.value}
                compact
                className="w-auto"
              />
              <div
                role="tablist"
                aria-label={results.view.label}
                className="flex gap-0.5 rounded-[9px] border border-line p-[3px]"
              >
                {(["list", "map"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={view === option}
                    onClick={() => setView(option)}
                    className={cn(
                      "cursor-pointer rounded-md px-3.5 py-[7px] text-[13px] font-semibold transition-colors",
                      view === option
                        ? "bg-surface-control text-ink"
                        : "text-ink-faint hover:text-ink"
                    )}
                  >
                    {option === "list" ? results.view.list : results.view.map}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {view === "map" ? <MapView onShowList={() => setView("list")} /> : <ListView />}
        </main>
      </div>

      <AppFooter width={WIDTH} />
    </div>
  );
}

function ListView() {
  return (
    <div className="mt-[22px] flex flex-col gap-3.5">
      {results.items.map((trip) => (
        <TripResultCard key={trip.id} trip={trip} />
      ))}

      <CardPanel tone="sunken" className="flex flex-wrap items-center gap-4 p-[20px_24px]">
        <div>
          <div className="font-display text-[17px] font-bold">{results.emptyPrompt.title}</div>
          <p className="mt-1.5 text-sm text-ink-subtle">{results.emptyPrompt.body}</p>
        </div>
        <ActionLink
          href={results.emptyPrompt.cta.href}
          size="md"
          className="md:ml-auto"
        >
          {results.emptyPrompt.cta.label}
        </ActionLink>
      </CardPanel>

      <div className="mt-2 flex justify-center">
        <ActionButton variant="quiet" size="md">
          {results.loadMore}
        </ActionButton>
      </div>
    </div>
  );
}

function MapView({ onShowList }: { onShowList: () => void }) {
  return (
    <div className="mt-[22px] grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
      <CardPanel tone="sunken" className="p-5">
        <RegionMap title={map.title} />

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line-subtle pt-4">
          {map.legend.map((entry) => (
            <div key={entry.label} className="flex items-center gap-2 text-[13px] text-ink-subtle">
              <DensityDot density={entry.density} className="size-2" />
              {entry.label}
            </div>
          ))}
          <div className="text-[12.5px] text-ink-ghost md:ml-auto">{map.updated}</div>
        </div>
      </CardPanel>

      <div className="flex flex-col gap-3.5">
        <CardPanel tone="warm" className="p-5">
          <CardEyebrow tone="brand">{map.corridor.eyebrow}</CardEyebrow>
          <div className="mt-3 mb-1 font-display text-xl font-bold tracking-[-0.02em]">
            {map.corridor.title}
          </div>
          <p className="text-[13.5px] leading-[1.55] text-ink-subtle">{map.corridor.body}</p>
        </CardPanel>

        <CardPanel className="p-5">
          <CardEyebrow>{map.corridorTrips.eyebrow}</CardEyebrow>
          <ul className="mt-4 flex flex-col gap-3.5">
            {map.corridorTrips.items.map((item) => (
              <li key={item.id} className="flex items-center gap-2.5 text-[13.5px]">
                <DensityDot density={item.density} />
                <span className="text-ink-muted">{item.label}</span>
                <span className="ml-auto text-ink-faint">{item.rating}</span>
              </li>
            ))}
          </ul>
          <ActionButton variant="outline" block className="mt-5 py-[11px]" onClick={onShowList}>
            {map.corridorTrips.cta}
          </ActionButton>
        </CardPanel>
      </div>
    </div>
  );
}
