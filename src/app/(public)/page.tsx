import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { MapSection } from "@/components/landing/map-section";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { listLocations } from "@/lib/services/locations";

/**
 * Rendered per request: a location any user adds while publishing is meant to
 * be visible to everyone immediately (architecture-context.md, Location
 * Catalog Model), so the catalog is never baked in at build time.
 */
export const dynamic = "force-dynamic";

/**
 * The map renders the real locations catalog; the hero counters, the recent
 * listing, the corridor list and the testimonials stay empty until the trips
 * service and a testimonials source exist.
 */
export default async function Home() {
  const locations = await listLocations();

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden bg-surface-base">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <FeaturesGrid />
        <MapSection locations={locations} />
        <Testimonials />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
