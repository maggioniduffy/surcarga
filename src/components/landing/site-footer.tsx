import Link from "next/link";
import { BrandMark } from "@/components/landing/brand-mark";
import { landing } from "@/content/es";

export function SiteFooter() {
  const { footer } = landing;

  return (
    <footer className="border-t border-line-faint px-8 pt-16 pb-10">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <BrandMark size={24} />
          <p className="mt-4 max-w-[280px] text-sm leading-[1.6] text-ink-faint">
            {footer.tagline}
          </p>
        </div>

        {footer.columns.map((column) => (
          <nav key={column.title} className="flex flex-col gap-3">
            <div className="text-[11px] font-semibold tracking-[0.16em] text-ink-ghost uppercase">
              {column.title}
            </div>
            {column.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-ink-subtle transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-[1240px] flex-wrap justify-between gap-5 border-t border-line-faint pt-6 text-[13px] text-ink-ghost">
        <span>{footer.copyright}</span>
        <span>{footer.region}</span>
      </div>
    </footer>
  );
}
