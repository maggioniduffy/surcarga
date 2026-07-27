import { LandingSection, SectionTitle } from "@/components/landing/landing-section";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { landing } from "@/content/es";

export function Testimonials() {
  const { testimonials } = landing;

  return (
    <LandingSection>
      <SectionEyebrow tone="muted">{testimonials.eyebrow}</SectionEyebrow>
      <SectionTitle className="max-w-[640px]">{testimonials.title}</SectionTitle>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.items.map((item) => (
          <figure
            key={item.name}
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
    </LandingSection>
  );
}
