import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { brand, dashboard } from "@/content/es";

export const metadata: Metadata = {
  title: `${dashboard.pageTitle} · ${brand.name}`,
};

export default function DashboardPage() {
  return <DashboardView />;
}
