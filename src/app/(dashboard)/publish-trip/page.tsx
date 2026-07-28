import type { Metadata } from "next";
import { PublishTripView } from "@/components/trip/publish-trip-view";
import { brand, publishTrip } from "@/content/es";

export const metadata: Metadata = {
  title: `${publishTrip.title} · ${brand.name}`,
  description: publishTrip.subtitle,
};

export default function PublishTripPage() {
  return <PublishTripView />;
}
