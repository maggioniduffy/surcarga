import type { Metadata } from "next";
import { TripDetailView } from "@/components/trip/trip-detail-view";
import { brand, tripDetail } from "@/content/es";

export const metadata: Metadata = {
  title: `${tripDetail.title.origin} → ${tripDetail.title.destination} · ${brand.name}`,
};

/**
 * Published trips are public-readable browse content (architecture-context.md,
 * System Boundaries), so this sits outside the dashboard guard. The `id` is
 * accepted but not yet used — the screen renders the design's sample trip
 * until the trip service exists.
 */
export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return <TripDetailView />;
}
