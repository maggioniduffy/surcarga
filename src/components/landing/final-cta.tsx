import Link from "next/link";
import { TopoLines } from "@/components/landing/topo-lines";
import { landing } from "@/content/es";

export function FinalCta() {
  const { finalCta } = landing;

  return (
    <section id="contacto" className="px-8 pb-[110px]">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[22px] bg-brand px-14 py-[76px] text-center">
        <TopoLines variant="inverted" />

        <div className="relative">
          <div className="text-[11.5px] font-semibold tracking-[0.2em] text-[#3d1503] uppercase">
            {finalCta.eyebrow}
          </div>

          <h2 className="mx-auto mt-[18px] max-w-[820px] font-display text-[clamp(2.25rem,6vw,62px)] leading-[0.98] font-black tracking-[-0.04em] text-balance text-surface-base">
            {finalCta.title}
          </h2>

          <p className="mx-auto mt-5 max-w-[540px] text-[17px] leading-[1.55] text-[#40170a]">
            {finalCta.subtitle}
          </p>

          <div className="mt-[34px] flex flex-wrap justify-center gap-3.5">
            <Link
              href="#precios"
              className="rounded-[11px] bg-surface-base px-[30px] py-4 font-display text-base font-bold text-white transition-colors hover:bg-surface-control"
            >
              {finalCta.ctaShipper}
            </Link>
            <Link
              href="#como-funciona"
              className="rounded-[11px] border-[1.5px] border-surface-base/35 px-[26px] py-4 font-display text-base font-bold text-[#2a0d02] transition-colors hover:border-surface-base"
            >
              {finalCta.ctaCarrier}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
