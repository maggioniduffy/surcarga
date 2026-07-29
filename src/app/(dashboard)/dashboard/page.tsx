import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import {
  emptyCarrierPanelData,
  emptyShipperPanelData,
} from "@/components/dashboard/panel-data";
import { brand, dashboard } from "@/content/es";
import { getCurrentAppUser } from "@/lib/auth/current-app-user";

export const metadata: Metadata = {
  title: `${dashboard.pageTitle} · ${brand.name}`,
};

/**
 * Both panels render empty until the trips/cargos/applications services exist;
 * the account in the header is the only real data on this screen today.
 */
export default async function DashboardPage() {
  const user = await getCurrentAppUser();

  return (
    <DashboardView
      user={user}
      carrierData={emptyCarrierPanelData}
      shipperData={emptyShipperPanelData}
    />
  );
}
