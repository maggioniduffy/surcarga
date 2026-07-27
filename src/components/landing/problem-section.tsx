import { LandingSection, SectionTitle } from "@/components/landing/landing-section";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { landing } from "@/content/es";

export function ProblemSection() {
  const { problem } = landing;

  return (
    <LandingSection>
      <SectionEyebrow>{problem.eyebrow}</SectionEyebrow>
      <SectionTitle className="max-w-[700px]">{problem.title}</SectionTitle>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {problem.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-line bg-surface-panel p-7"
          >
            <div className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
              {card.kicker}
            </div>
            <h3 className="mt-3.5 mb-2.5 font-display text-2xl font-bold tracking-[-0.02em]">
              {card.title}
            </h3>
            <p className="text-[15px] leading-[1.62] text-ink-subtle">{card.body}</p>
          </article>
        ))}
      </div>
    </LandingSection>
  );
}
