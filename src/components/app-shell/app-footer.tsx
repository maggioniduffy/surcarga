import Link from "next/link";
import { BrandMark } from "@/components/landing/brand-mark";
import { appShell } from "@/content/es";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface AppFooterProps {
  /** Matches the max width of the screen it sits under. */
  width?: string;
}

export function AppFooter({ width = "1240px" }: AppFooterProps) {
  const { footer } = appShell;

  return (
    <footer className="border-t border-line-faint bg-surface-base px-6 py-7 sm:px-8">
      <div
        className={cn("mx-auto flex flex-wrap items-center gap-x-7 gap-y-5")}
        style={{ maxWidth: width }}
      >
        <Link href={routes.home}>
          <BrandMark size={20} />
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
          {footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-subtle transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-1 text-[12.5px] text-ink-ghost md:ml-auto">
          <span>{footer.region}</span>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
