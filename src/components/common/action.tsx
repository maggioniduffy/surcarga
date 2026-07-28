import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons and button-shaped links on this design's own scale. The shadcn
 * `Button` primitive stays for generic UI; these carry the Archivo/orange
 * treatment the delivered screens use everywhere.
 */
export const actionVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-[9px] font-display font-bold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-surface-base hover:bg-brand-hover",
        outline:
          "border border-line-control text-ink hover:border-line-control-hover",
        quiet:
          "border border-line-control text-ink-subtle hover:border-line-control-hover hover:text-ink",
      },
      size: {
        sm: "px-[15px] py-2.5 text-[13.5px]",
        md: "rounded-[10px] px-[22px] py-[13px] text-[14.5px]",
        lg: "rounded-[10px] px-5 py-3.5 text-[15.5px]",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "sm", block: false },
  }
);

type ActionVariants = VariantProps<typeof actionVariants>;

export function ActionButton({
  className,
  variant,
  size,
  block,
  ...props
}: React.ComponentProps<"button"> & ActionVariants) {
  return (
    <button
      type="button"
      className={cn(actionVariants({ variant, size, block }), className)}
      {...props}
    />
  );
}

export function ActionLink({
  className,
  variant,
  size,
  block,
  ...props
}: React.ComponentProps<typeof Link> & ActionVariants) {
  return (
    <Link
      className={cn(actionVariants({ variant, size, block }), className)}
      {...props}
    />
  );
}

/** The small orange "Ver todas →" style link that sits in card headers. */
export function InlineLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-[13px] font-semibold text-brand transition-colors hover:text-brand-link-hover",
        className
      )}
      {...props}
    />
  );
}
