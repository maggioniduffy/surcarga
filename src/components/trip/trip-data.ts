import type { TagTone, RouteDensity } from "@/components/common/pills";
import type { Stop } from "@/components/trip/stop-timeline";

export interface TripDocument {
  id: string;
  label: string;
  meta: string;
  ok: boolean;
}

export interface TripReview {
  id: string;
  author: string;
  rating: string;
  date: string;
  body: string;
}

export interface TripCarrier {
  initials: string;
  name: string;
  meta: string;
  tags: readonly { label: string; tone: TagTone }[];
  responseTime: string | null;
}

export interface TripUnit {
  rows: readonly { label: string; value: string }[];
  accepts: readonly string[];
  rejects: readonly string[];
}

export interface RelatedTrip {
  id: string;
  label: string;
  rating: string;
  density: RouteDensity;
}

/** A published trip as the detail screen renders it. */
export interface TripDetailData {
  reference: string;
  featured: boolean;
  origin: string;
  destination: string;
  meta: readonly string[];
  /** Metric values keyed by the ids in `tripDetail.metrics`. */
  metrics: Readonly<Record<string, string | null>>;
  stops: readonly Stop[];
  unit: TripUnit | null;
  documents: readonly TripDocument[];
  /** Reputation figures keyed by id, plus the reviews behind them. */
  reputation: {
    stats: readonly { id: string; label: string; value: string | null; accent?: boolean }[];
    reviews: readonly TripReview[];
  };
  carrier: TripCarrier | null;
  otherTrips: readonly RelatedTrip[];
  /** Listing fee shown on the request panel, from the payment service. */
  feeValue: string | null;
}
