import type { Transition, Variants } from "framer-motion";
import { tokens } from "@/design-system/generated/tokens";

/**
 * Framer Motion helpers sourced from motion tokens — never hard-code durations
 * or easing curves in components.
 */

const { duration, ease } = tokens.motionRaw;

const standard = [...ease.standard] as [number, number, number, number];
const entrance = [...ease.entrance] as [number, number, number, number];

export const transition = {
  fast: { duration: duration.fast, ease: standard } satisfies Transition,
  base: { duration: duration.base, ease: standard } satisfies Transition,
  slow: { duration: duration.slow, ease: standard } satisfies Transition,
};

/** Default scroll-reveal: fade + rise. Used by <Reveal />. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: entrance },
  },
};

/** Staggered container for lists of revealing children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
