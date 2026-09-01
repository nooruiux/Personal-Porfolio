import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Download,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Moon,
  Palette,
  PenTool,
  Send,
  Smartphone,
  Sparkles,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { tokens } from "@/design-system/generated/tokens";

/**
 * Icon — the only place raw lucide components are referenced. Everywhere else,
 * use `<Icon name="…" />` so sizing, stroke width and color stay consistent.
 *
 * Add an icon: import it from `lucide-react` and add it to `registry` below.
 * For brand/social marks (LinkedIn, Behance, …) use `<BrandIcon />` instead —
 * lucide no longer ships brand logos.
 *
 * @example
 * <Icon name="arrow-right" size="sm" />
 * <Icon name="download" size="md" color="brand" />
 */
const registry = {
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  briefcase: Briefcase,
  check: CheckCircle2,
  code: Code2,
  download: Download,
  graduation: GraduationCap,
  loader: Loader2,
  mail: Mail,
  "map-pin": MapPin,
  megaphone: Megaphone,
  menu: Menu,
  moon: Moon,
  palette: Palette,
  "pen-tool": PenTool,
  send: Send,
  smartphone: Smartphone,
  sparkles: Sparkles,
  sun: Sun,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

const COLOR_CLASS = {
  current: "text-current",
  brand: "text-brand",
  accent: "text-brand-accent",
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  "on-brand": "text-brand-on-brand",
} as const;

export interface IconProps {
  name: IconName;
  size?: "sm" | "md" | "lg";
  color?: keyof typeof COLOR_CLASS;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

export function Icon({
  name,
  size = "md",
  color = "current",
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: IconProps) {
  const LucideComponent = registry[name];

  return (
    <LucideComponent
      size={tokens.iconSizePx[size]}
      strokeWidth={tokens.iconStrokeWidth}
      className={cn("shrink-0", COLOR_CLASS[color], className)}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  );
}
