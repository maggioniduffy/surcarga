"use client";

import { useId, useState } from "react";
import { LandingSection, SectionTitle } from "@/components/landing/landing-section";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { landing } from "@/content/es";

export function FaqSection() {
  const { faq } = landing;
  const baseId = useId();
  // The first answer is open on load so the section never reads as an empty stack.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <LandingSection width="narrow">
      <SectionEyebrow tone="muted">{faq.eyebrow}</SectionEyebrow>
      <SectionTitle className="mb-11">{faq.title}</SectionTitle>

      <div className="flex flex-col gap-3">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-xl border border-line bg-surface-panel"
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full cursor-pointer items-center gap-4 px-6 py-[22px] text-left font-display text-lg font-bold text-ink"
              >
                <span className="flex-1">{item.question}</span>
                <span aria-hidden className="text-[22px] leading-none text-brand">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <p
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="max-w-[720px] px-6 pb-6 text-[15.5px] leading-[1.65] text-ink-subtle"
                >
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </LandingSection>
  );
}
