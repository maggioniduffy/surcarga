import { LandingSection, SectionTitle } from "@/components/landing/landing-section";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { FeatureIcon, type FeatureIconName } from "@/components/landing/feature-icon";
import { landing } from "@/content/es";

export function FeaturesGrid() {
  const { features } = landing;

  return (
    <LandingSection>
      <SectionEyebrow>{features.eyebrow}</SectionEyebrow>
      <SectionTitle className="max-w-[780px]">{features.title}</SectionTitle>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.items.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-line bg-surface-panel p-[26px] transition-colors hover:border-line-control-hover"
          >
            <FeatureIcon name={item.icon as FeatureIconName} />
            <h3 className="mt-[18px] mb-2 font-display text-xl font-bold tracking-[-0.015em]">
              {item.title}
            </h3>
            <p className="text-[14.5px] leading-[1.6] text-ink-subtle">{item.body}</p>
          </article>
        ))}
      </div>
    </LandingSection>
  );
}
