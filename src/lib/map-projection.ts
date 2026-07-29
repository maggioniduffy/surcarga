import type { CatalogLocation } from "@/lib/locations";

/** Fallback frame when the catalog is too small to derive a bounding box. */
const VACA_MUERTA_BOUNDS = {
  minLatitude: -39.2,
  maxLatitude: -37.6,
  minLongitude: -69.6,
  maxLongitude: -67.6,
} as const;

export interface ProjectedLocation extends CatalogLocation {
  x: number;
  y: number;
}

interface ProjectionBox {
  width: number;
  height: number;
  padding: number;
}

/**
 * Linear lat/long → viewBox projection for the schematic maps. Straight lines
 * between catalog points, no tiles and no routing API (architecture-context.md
 * Invariant #4), so a plain equirectangular mapping is all that is needed.
 */
export function projectLocations(
  locations: readonly CatalogLocation[],
  { width, height, padding }: ProjectionBox
): ProjectedLocation[] {
  const latitudes = locations.map((location) => location.latitude);
  const longitudes = locations.map((location) => location.longitude);

  const minLatitude = Math.min(VACA_MUERTA_BOUNDS.minLatitude, ...latitudes);
  const maxLatitude = Math.max(VACA_MUERTA_BOUNDS.maxLatitude, ...latitudes);
  const minLongitude = Math.min(VACA_MUERTA_BOUNDS.minLongitude, ...longitudes);
  const maxLongitude = Math.max(VACA_MUERTA_BOUNDS.maxLongitude, ...longitudes);

  const spanX = maxLongitude - minLongitude;
  const spanY = maxLatitude - minLatitude;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  return locations.map((location) => ({
    ...location,
    x: padding + ((location.longitude - minLongitude) / spanX) * innerWidth,
    // Latitude grows northward, the viewBox grows downward.
    y: padding + ((maxLatitude - location.latitude) / spanY) * innerHeight,
  }));
}
