import type { Metadata } from "next";
import { PublishCargoView } from "@/components/cargo/publish-cargo-view";
import { brand, publishCargo } from "@/content/es";

export const metadata: Metadata = {
  title: `${publishCargo.title} · ${brand.name}`,
  description: publishCargo.subtitle,
};

export default function PublishCargoPage() {
  return <PublishCargoView />;
}
