import { cn } from "@/lib/utils";
import { brand } from "@/content/es";

interface BrandMarkProps {
  size?: number;
  className?: string;
}

export function BrandMark({ size = 26, className }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        className="text-brand"
        aria-hidden
      >
        <path d="M2 17h2M20 17h2" />
        <rect x="4" y="9" width="10" height="8" rx="1.5" />
        <path d="M14 12h3.5l2.5 3v2h-6" />
        <circle cx="7.5" cy="18.5" r="1.8" />
        <circle cx="17" cy="18.5" r="1.8" />
      </svg>
      <span
        className="font-display font-extrabold tracking-[-0.02em]"
        style={{ fontSize: size * 0.73 }}
      >
        {brand.name}
      </span>
    </div>
  );
}
