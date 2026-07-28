import { cn } from "@/lib/utils";

/** Green tick used for confirmations and verified documentation rows. */
export function CheckIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 text-status-published-text", className)}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Yellow alert used for pending documentation and expiry notices. */
export function AlertIcon({ size = 17, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      className={cn("shrink-0 text-status-pending-text", className)}
      aria-hidden
    >
      <path d="M12 8v5M12 16.5v.5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

/** Bordered box carrying an alert icon and a short message. */
export function WarningNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Pinned dark in both themes, like the other accent panels.
        "on-dark-panel flex items-start gap-3 rounded-xl border border-[#3a3320] bg-[#171307] px-4 py-4",
        className
      )}
    >
      <AlertIcon className="mt-px" />
      <div className="text-[13.5px] leading-[1.55] text-ink-muted">{children}</div>
    </div>
  );
}
