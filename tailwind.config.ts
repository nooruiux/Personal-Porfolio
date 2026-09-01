import type { Config } from "tailwindcss";
import { tokens } from "./design-system/generated/tokens";

/**
 * The generated tokens object is `as const` (deeply readonly). Tailwind's
 * config types expect mutable structures, so we widen here. Values are
 * unchanged — this is a type-only cast.
 */
const mutable = <T,>(value: T): DeepMutable<T> => value as DeepMutable<T>;
type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T;

/**
 * Tailwind is configured to *consume* the design tokens, never to define styles
 * ad hoc. Every value below comes from design-system/generated/tokens.ts, which
 * is generated from design-system/tokens.json by `npm run tokens`.
 *
 * To change the look of the site, edit tokens.json — not this file.
 */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: mutable(tokens.color.brand),
        surface: mutable(tokens.color.surface),
        text: mutable(tokens.color.text),
        border: mutable(tokens.color.border),
      },
      fontFamily: {
        heading: [tokens.fontFamily.heading],
        body: [tokens.fontFamily.body],
        sans: [tokens.fontFamily.body],
      },
      fontSize: tokens.fontSize as unknown as Record<
        string,
        [string, { lineHeight: string }]
      >,
      fontWeight: mutable(tokens.fontWeight),
      letterSpacing: mutable(tokens.letterSpacing),
      spacing: mutable(tokens.space),
      borderRadius: mutable(tokens.radius),
      boxShadow: mutable(tokens.shadow),
      transitionDuration: mutable(tokens.motion.duration),
      transitionTimingFunction: mutable(tokens.motion.ease),
      // Icon sizing helpers (w-icon-md / h-icon-md).
      width: mutable(tokens.iconSize),
      height: mutable(tokens.iconSize),
    },
  },
  plugins: [],
} satisfies Config;
