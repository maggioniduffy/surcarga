"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/landing/brand-mark";
import { UserChip, type AppUser } from "@/components/app-shell/user-chip";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { appShell } from "@/content/es";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

interface AppHeaderProps {
  nav: readonly NavItem[];
  /** `null` on the public screens, where there may be no session. */
  user: AppUser | null;
  /** Highlighted nav entry for the current screen. */
  activeHref?: string;
  /** Short label shown next to the logo instead of a nav (dashboard style). */
  pageLabel?: string;
  /** Screen-specific controls (role tabs, primary CTA) rendered before the user chip. */
  actions?: React.ReactNode;
  /** Matches the max width of the screen it sits above. */
  width?: string;
}

export function AppHeader({
  nav,
  user,
  activeHref,
  pageLabel,
  actions,
  width = "1240px",
}: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line-subtle bg-surface-base/90 backdrop-blur-[14px]">
      <div
        className="mx-auto flex h-[66px] items-center gap-4 px-6 sm:gap-7 sm:px-8"
        style={{ maxWidth: width }}
      >
        <Link href={routes.home} aria-label={appShell.header.homeLabel}>
          <BrandMark size={24} />
        </Link>

        {pageLabel ? (
          <span className="hidden text-[13px] text-ink-ghost sm:inline">{pageLabel}</span>
        ) : null}

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {nav.map((item) => {
            const active = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors",
                  active
                    ? "border-b-2 border-brand pb-0.5 font-semibold text-ink"
                    : "text-ink-subtle hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-3.5">
          {actions}

          <ThemeToggle />

          <div className="hidden items-center border-line-subtle pl-3.5 sm:flex sm:border-l">
            {user ? (
              <UserChip user={user} />
            ) : (
              <Link
                href={routes.signIn}
                className="text-[13px] font-semibold text-ink-subtle transition-colors hover:text-ink"
              >
                {appShell.header.signIn}
              </Link>
            )}
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? appShell.header.closeMenu : appShell.header.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-[34px] cursor-pointer items-center justify-center rounded-[9px] border border-line-control text-ink-subtle transition-colors hover:border-line-control-hover hover:text-ink lg:hidden"
          >
            {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line-subtle bg-surface-base px-6 pt-4 pb-6 sm:px-8 lg:hidden">
          <div className="mx-auto flex flex-col gap-1" style={{ maxWidth: width }}>
            <div className="mb-3 sm:hidden">
              {user ? (
                <UserChip user={user} compact={false} />
              ) : (
                <Link
                  href={routes.signIn}
                  onClick={() => setMenuOpen(false)}
                  className="text-[15px] font-semibold text-brand"
                >
                  {appShell.header.signIn}
                </Link>
              )}
            </div>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={item.href === activeHref ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-[15px] transition-colors hover:bg-surface-control",
                  item.href === activeHref ? "font-semibold text-brand" : "text-ink-subtle"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
