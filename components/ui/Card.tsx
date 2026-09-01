import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card — surface container for panels, project tiles, skill cards, etc.
 *
 * @example
 * <Card interactive>…</Card>
 * <Card as="article" padding="lg">…</Card>
 */
export const cardVariants = cva(
  "rounded-lg border border-border-default bg-surface-card transition duration-base ease-standard",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: "will-change-transform hover:-translate-y-1 hover:border-brand hover:shadow-glow",
        false: "",
      },
    },
    defaultVariants: { padding: "md", interactive: false },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Render as a different element for correct semantics (e.g. "article"). */
  as?: "div" | "article" | "li" | "section";
}

export function Card({
  as = "div",
  padding,
  interactive,
  className,
  ...props
}: CardProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(cardVariants({ padding, interactive }), className)}
      {...props}
    />
  );
}
