"use client";

import { useState } from "react";
import { AppFooter } from "@/components/app-shell/app-footer";
import { AppHeader } from "@/components/app-shell/app-header";
import type { AppUser } from "@/components/app-shell/user-chip";
import { ShipperPanel } from "@/components/dashboard/shipper-panel";
import { RoleTabs, type DashboardRole } from "@/components/dashboard/role-tabs";
import { CarrierPanel } from "@/components/dashboard/carrier-panel";
import type { CarrierPanelData, ShipperPanelData } from "@/components/dashboard/panel-data";
import { appShell, dashboard } from "@/content/es";
import { routes } from "@/lib/routes";

const WIDTH = "1280px";

interface DashboardViewProps {
  user: AppUser | null;
  carrierData: CarrierPanelData;
  shipperData: ShipperPanelData;
}

/**
 * Role-split panel. The tab control is a preview affordance carried over from
 * the design — once `users.role` is wired the session decides which panel
 * renders and the tabs come out.
 */
export function DashboardView({ user, carrierData, shipperData }: DashboardViewProps) {
  const [role, setRole] = useState<DashboardRole>("carrier");

  return (
    <div className="flex flex-1 flex-col bg-surface-base">
      <AppHeader
        width={WIDTH}
        pageLabel={dashboard.pageTitle}
        nav={appShell.nav[role]}
        activeHref={routes.dashboard}
        user={user}
        actions={
          <RoleTabs
            label={dashboard.roleTabs.label}
            labels={{
              carrier: dashboard.roleTabs.carrier,
              shipper: dashboard.roleTabs.shipper,
            }}
            value={role}
            onChange={setRole}
          />
        }
      />

      <main className="mx-auto w-full flex-1 px-6 pt-8 pb-20 sm:px-8" style={{ maxWidth: WIDTH }}>
        {role === "carrier" ? (
          <CarrierPanel name={user?.name ?? null} data={carrierData} />
        ) : (
          <ShipperPanel name={user?.name ?? null} data={shipperData} />
        )}
      </main>

      <AppFooter width={WIDTH} />
    </div>
  );
}
