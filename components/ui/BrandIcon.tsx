import {
  siBehance,
  siDribbble,
  siGithub,
  siInstagram,
  siX,
} from "simple-icons";
import { cn } from "@/lib/utils";
import { tokens } from "@/design-system/generated/tokens";

/**
 * BrandIcon — social / brand marks, kept separate from <Icon /> because
 * lucide-react no longer ships brand logos. Paths come from `simple-icons`
 * (CC0); LinkedIn is inlined because simple-icons dropped it on request.
 *
 * @example
 * <BrandIcon name="linkedin" size="md" />
 */

// LinkedIn "in" glyph (public domain outline).
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const registry: Record<string, { path: string; title: string }> = {
  behance: { path: siBehance.path, title: siBehance.title },
  dribbble: { path: siDribbble.path, title: siDribbble.title },
  github: { path: siGithub.path, title: siGithub.title },
  instagram: { path: siInstagram.path, title: siInstagram.title },
  x: { path: siX.path, title: siX.title },
  twitter: { path: siX.path, title: "X (Twitter)" },
  linkedin: { path: LINKEDIN_PATH, title: "LinkedIn" },
};

export type BrandName = keyof typeof registry;

export interface BrandIconProps {
  name: BrandName;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Provide when the icon is the only content of a link/button. */
  title?: string;
}

export function BrandIcon({ name, size = "md", className, title }: BrandIconProps) {
  const entry = registry[name];
  const px = tokens.iconSizePx[size];
  const label = title ?? entry.title;

  return (
    <svg
      viewBox="0 0 24 24"
      width={px}
      height={px}
      fill="currentColor"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title ? label : undefined}
      aria-hidden={title ? undefined : true}
    >
      <path d={entry.path} />
    </svg>
  );
}
