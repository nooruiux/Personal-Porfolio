import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — the single button/CTA primitive.
 *
 * Variants and sizes are defined with `class-variance-authority` so a future
 * dev can add or restyle a variant in one place. All colors, radii, shadows and
 * motion come from design tokens via Tailwind.
 *
 * Renders a `<button>` by default, or an anchor/`next/link` when `href` is set.
 *
 * @example
 * <Button variant="primary" size="lg">View Work</Button>
 * <Button href="/resume.pdf" download variant="outline">Download Resume</Button>
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition duration-base ease-standard focus-visible:outline-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-on-brand shadow-md hover:bg-brand-primary-dark hover:shadow-glow",
        secondary:
          "bg-surface-muted text-text-primary hover:bg-border-default",
        outline:
          "border border-border-default bg-transparent text-text-primary hover:border-brand hover:text-brand",
        ghost: "bg-transparent text-text-primary hover:bg-surface-muted",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (typeof props.href === "string") {
    const { href, ...rest } = props as ButtonAsLink;
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || "download" in rest;

    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
