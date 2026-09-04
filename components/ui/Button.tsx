import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * Button — the single button/CTA primitive.
 *
 * Variants and sizes are defined with `class-variance-authority` so a future
 * dev can add or restyle a variant in one place. All colors, radii, shadows and
 * motion come from design tokens via Tailwind.
 *
 * `variant="primary"` is a gradient pill (design-system/tokens.json ->
 * `gradient.primaryCta`). Pass `arrow` to append the circular trailing-arrow
 * badge from the reference design — used on the two CTA buttons (Header's
 * "Book Appointment", Hero's "View Work"). Leave it off on primary buttons
 * that already carry their own meaningful icon (Download Resume, Send
 * message) so icons don't double up.
 *
 * `shape` is an independent, opt-in axis (no default — every existing button
 * is unaffected unless you pass it): `"pill"` forces full rounding on any
 * variant, `"chamfer"` clips all 4 corners at an angle instead
 * (design-system/tokens.json -> `radius.chamfer`, see `.chamfer-btn` in
 * globals.css) for a sharper, more technical look.
 *
 * Renders a `<button>` by default, or an anchor/`next/link` when `href` is set.
 *
 * @example
 * <Button variant="primary" size="lg" arrow>View Work</Button>
 * <Button href="/resume.pdf" download variant="outline">Download Resume</Button>
 * <Button variant="primary" shape="chamfer" arrow>Book Appointment</Button>
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition duration-base ease-standard will-change-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface-bg active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-primary-cta text-brand-on-brand shadow-md hover:scale-[1.02] hover:shadow-glow",
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
      shape: {
        pill: "rounded-full",
        chamfer: "chamfer-btn rounded-none",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  /** Append the circular trailing-arrow badge (primary CTA style). */
  arrow?: boolean;
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

/** Semi-transparent white circle + diagonal arrow, for `<Button arrow>`. */
function ArrowBadge() {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 transition duration-base ease-standard group-hover:translate-x-0.5 group-hover:bg-white/30">
      <Icon name="arrow-up-right" size="sm" color="on-brand" />
    </span>
  );
}

export function Button({
  variant,
  size,
  shape,
  arrow,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size, shape }),
    arrow && "group pr-1.5",
    className,
  );

  if (typeof props.href === "string") {
    const { href, ...rest } = props as ButtonAsLink;
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || "download" in rest;

    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
          {arrow ? <ArrowBadge /> : null}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
        {arrow ? <ArrowBadge /> : null}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
      {arrow ? <ArrowBadge /> : null}
    </button>
  );
}
