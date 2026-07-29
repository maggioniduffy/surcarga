import type { Metadata } from "next";
import { TripDetailView } from "@/components/trip/trip-detail-view";
import { brand, tripDetail } from "@/content/es";
import { getCurrentAppUser } from "@/lib/auth/current-app-user";

export const metadata: Metadata = {
  title: `${tripDetail.pageTitle} · ${brand.name}`,
};

/**
 * Published trips are public-readable browse content (architecture-context.md,
 * System Boundaries), so this sits outside the dashboard guard and the session
 * is optional. The `id` is accepted but not resolved yet: the trip service does
 * not exist, so the screen renders its empty states.
 */
export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  const user = await getCurrentAppUser();

  return <TripDetailView user={user} trip={null} />;
}
