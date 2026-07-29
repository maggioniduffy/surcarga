import type { Metadata } from "next";
import { SearchTrucksView } from "@/components/search/search-trucks-view";
import { brand, searchTrucks } from "@/content/es";
import { getCurrentAppUser } from "@/lib/auth/current-app-user";
import { listLocations } from "@/lib/services/locations";

export const metadata: Metadata = {
  title: `${searchTrucks.results.title} · ${brand.name}`,
};

/** Reads the live locations catalog, so it renders per request. */
export const dynamic = "force-dynamic";

/**
 * Public browse screen (architecture-context.md, System Boundaries), so the
 * session is optional. Locations come from the catalog; the result list stays
 * empty until the trips search service exists.
 */
export default async function SearchTrucksPage() {
  const [user, locations] = await Promise.all([getCurrentAppUser(), listLocations()]);

  return (
    <SearchTrucksView
      user={user}
      locations={locations}
      trips={[]}
      corridor={null}
      corridorTrips={[]}
    />
  );
}
