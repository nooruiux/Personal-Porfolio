import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge — small status / category label.
 *
 * @example
 * <Badge variant="brand">Featured</Badge>
 * <Badge variant="outline">UI/UX</Badge>
 */
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        brand: "bg-brand-tint text-brand",
        accent: "bg-brand-tint text-brand-accent",
        neutral: "bg-surface-muted text-text-secondary",
        outline: "border border-border-default text-text-secondary",
      },
    },
    defaultVariants: { variant: "brand" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ variant, className, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
