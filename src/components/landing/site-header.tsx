import Link from "next/link";
import { BrandMark } from "@/components/landing/brand-mark";
import { landing } from "@/content/es";

export function SiteHeader() {
  const { header } = landing;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-subtle bg-surface-base/80 backdrop-blur-[14px]">
      <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between gap-7 px-8">
        <Link href="/" aria-label={landing.header.ctaEmpresa}>
          <BrandMark size={26} />
        </Link>

        <nav className="hidden items-center gap-7 text-[14.5px] text-ink-subtle lg:flex">
          {header.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <div className="hidden items-center gap-0.5 rounded-lg border border-line-raised p-[3px] sm:flex">
            <span className="rounded-md bg-surface-control px-2.5 py-[5px] text-xs font-semibold text-ink">
              {header.locales.active}
            </span>
            <span className="rounded-md px-2.5 py-[5px] text-xs font-semibold text-ink-faint">
              {header.locales.alternate}
            </span>
          </div>

          <Link
            href="#como-funciona"
            className="hidden rounded-[9px] border border-line-control px-4 py-2.5 font-display text-sm font-bold text-ink transition-colors hover:border-line-control-hover sm:inline-flex"
          >
            {header.ctaTransportista}
          </Link>
          <Link
            href="#como-funciona"
            className="inline-flex rounded-[9px] bg-brand px-[18px] py-[11px] font-display text-sm font-bold text-surface-base transition-colors hover:bg-brand-hover"
          >
            {header.ctaEmpresa}
          </Link>
        </div>
      </div>
    </header>
  );
}
