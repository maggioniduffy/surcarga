"use client";

import { cn } from "@/lib/utils";

export type DashboardRole = "carrier" | "shipper";

interface RoleTabsProps {
  label: string;
  labels: Record<DashboardRole, string>;
  value: DashboardRole;
  onChange: (role: DashboardRole) => void;
}

const order: readonly DashboardRole[] = ["carrier", "shipper"];

/**
 * Switches the panel between the two role views. This is a preview control on
 * the design screen — the real panel renders whichever role the session has.
 */
export function RoleTabs({ label, labels, value, onChange }: RoleTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex gap-0.5 rounded-[9px] border border-line p-[3px]"
    >
      {order.map((role) => {
        const active = role === value;
        return (
          <button
            key={role}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(role)}
            className={cn(
              "cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition-colors sm:px-3.5 sm:py-[7px]",
              active ? "bg-surface-control text-ink" : "text-ink-faint hover:text-ink"
            )}
          >
            {labels[role]}
          </button>
        );
      })}
    </div>
  );
}
