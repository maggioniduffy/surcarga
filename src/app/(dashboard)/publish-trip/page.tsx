import type { Metadata } from "next";
import { PublishTripView } from "@/components/trip/publish-trip-view";
import { brand, publishTrip } from "@/content/es";
import { getCurrentAppUser } from "@/lib/auth/current-app-user";
import { listLocations } from "@/lib/services/locations";

export const metadata: Metadata = {
  title: `${publishTrip.title} · ${brand.name}`,
  description: publishTrip.subtitle,
};

/**
 * Origin/destination come from the locations catalog. The carrier's units and
 * the cargo waiting on the route stay empty until the fleet model and the
 * cargos service exist.
 */
export default async function PublishTripPage() {
  const [user, locations] = await Promise.all([getCurrentAppUser(), listLocations()]);

  return (
    <PublishTripView user={user} locations={locations} waitingCargo={[]} unitOptions={[]} />
  );
}
