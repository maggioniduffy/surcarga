import type { Metadata } from "next";
import { SearchTrucksView } from "@/components/search/search-trucks-view";
import { brand, searchTrucks } from "@/content/es";

export const metadata: Metadata = {
  title: `${searchTrucks.results.title} · ${brand.name}`,
};

export default function SearchTrucksPage() {
  return <SearchTrucksView />;
}
