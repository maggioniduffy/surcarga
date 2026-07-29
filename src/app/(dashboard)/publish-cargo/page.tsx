import type { Metadata } from "next";
import { PublishCargoView } from "@/components/cargo/publish-cargo-view";
import { brand, publishCargo } from "@/content/es";
import { getCurrentAppUser } from "@/lib/auth/current-app-user";
import { listLocations } from "@/lib/services/locations";

export const metadata: Metadata = {
  title: `${publishCargo.title} · ${brand.name}`,
  description: publishCargo.subtitle,
};

/**
 * Origin/destination come from the locations catalog; the payment method and
 * monthly usage stay empty until the payment service exists.
 */
export default async function PublishCargoPage() {
  const [user, locations] = await Promise.all([getCurrentAppUser(), listLocations()]);

  return (
    <PublishCargoView
      user={user}
      locations={locations}
      paymentMethod={null}
      usage={null}
    />
  );
}
