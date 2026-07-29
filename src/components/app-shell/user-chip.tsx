import { cn } from "@/lib/utils";

export interface AppUser {
  initials: string;
  name: string;
  /** Role/company line — `null` until `users.role` is synced from Clerk. */
  meta: string | null;
}

interface UserChipProps {
  user: AppUser;
  /** Hide the name/meta block on narrow viewports, leaving just the avatar. */
  compact?: boolean;
  className?: string;
}

export function UserChip({ user, compact = true, className }: UserChipProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-raised bg-surface-control font-display text-[12.5px] font-bold text-brand"
      >
        {user.initials}
      </span>
      <span className={cn("text-[13px] leading-[1.25]", compact && "hidden md:block")}>
        <span className="block font-semibold">{user.name}</span>
        {user.meta ? <span className="block text-xs text-ink-faint">{user.meta}</span> : null}
      </span>
    </div>
  );
}
