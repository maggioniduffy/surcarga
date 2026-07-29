import type { LocationType } from "@/generated/prisma/enums";

/**
 * A catalog entry reduced to what the screens render. Kept apart from
 * `lib/services/locations.ts` so client components can import the shape and
 * the option mapper without pulling Prisma into the browser bundle.
 */
export interface CatalogLocation {
  id: string;
  name: string;
  type: LocationType;
  latitude: number;
  longitude: number;
}

/** Catalog rows in the `{ value, label }` shape the select controls expect. */
export function toLocationOptions(locations: readonly CatalogLocation[]) {
  return locations.map((location) => ({ value: location.id, label: location.name }));
}
