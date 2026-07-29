import { EmptyState } from "@/components/common/empty-state";
import { LandingSection, SectionTitle } from "@/components/landing/landing-section";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { landing } from "@/content/es";

export interface Testimonial {
  id: string;
  quote: string;
  initials: string;
  name: string;
  role: string;
}

export function Testimonials({ items = [] }: { items?: readonly Testimonial[] }) {
  const { testimonials } = landing;

  return (
    <LandingSection>
      <SectionEyebrow tone="muted">{testimonials.eyebrow}</SectionEyebrow>
      <SectionTitle className="max-w-[640px]">{testimonials.title}</SectionTitle>

      {items.length === 0 ? (
        <EmptyState className="mt-14">{testimonials.empty}</EmptyState>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col gap-[22px] rounded-xl border border-line bg-surface-panel p-7"
            >
              <blockquote className="text-[16.5px] leading-[1.6] text-ink-strong">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className="flex size-[38px] items-center justify-center rounded-full border border-line-raised bg-surface-control font-display text-sm font-bold text-brand">
                  {item.initials}
                </span>
                <span>
                  <span className="block text-[14.5px] font-semibold">{item.name}</span>
                  <span className="block text-[13px] text-ink-faint">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </LandingSection>
  );
}
