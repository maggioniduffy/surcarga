import type { TableRow } from "@/components/dashboard/data-table";
import type { RouteDensity } from "@/components/common/pills";

/** A cargo request a carrier received for one of their trips. */
export interface RequestItem {
  id: string;
  badge?: string;
  meta: string;
  title: string;
  detail: string;
  urgent: boolean;
}

/** A cargo listing published by a shipper, with its application count. */
export interface ListingItem {
  id: string;
  badge?: string;
  meta: string;
  title: string;
  detail: string;
  count: number;
  featured: boolean;
}

/** One-line entry in the density-dotted side lists. */
export interface DensityItem {
  id: string;
  label: string;
  value: string;
  density: RouteDensity;
}

export interface HistoryItem {
  id: string;
  route: string;
  rating: string;
  meta: string;
}

export interface NoticeItem {
  title: string;
  body: string;
  cta: string;
}

export interface SpendData {
  total: string;
  period: string;
  axisStart: string;
  axisEnd: string;
  /** Bar heights as a percentage of the chart box. */
  bars: readonly number[];
  breakdown: readonly { label: string; value: string; positive?: boolean }[];
}

export interface CarrierPanelData {
  /** Stat values keyed by the ids in `dashboard.carrier.stats`. */
  stats: Readonly<Record<string, string | null>>;
  pendingRequestCount: number;
  requests: readonly RequestItem[];
  trips: readonly TableRow[];
  availableCargo: readonly DensityItem[];
  history: readonly HistoryItem[];
  notice: NoticeItem | null;
}

export interface ShipperPanelData {
  stats: Readonly<Record<string, string | null>>;
  activeListingCount: number;
  listings: readonly ListingItem[];
  shipments: readonly TableRow[];
  spend: SpendData | null;
  packOffer: { body: string; cta: string } | null;
  nextExpiry: { title: string; body: string } | null;
}

/**
 * What the panels render until the trips/cargos/applications services exist.
 * Nothing here is sample data — it is the shape of "no records yet".
 */
export const emptyCarrierPanelData: CarrierPanelData = {
  stats: {},
  pendingRequestCount: 0,
  requests: [],
  trips: [],
  availableCargo: [],
  history: [],
  notice: null,
};

export const emptyShipperPanelData: ShipperPanelData = {
  stats: {},
  activeListingCount: 0,
  listings: [],
  shipments: [],
  spend: null,
  packOffer: null,
  nextExpiry: null,
};
