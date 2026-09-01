import type { Transition, Variants } from "framer-motion";
import { tokens } from "@/design-system/generated/tokens";

/**
 * Motion configuration for Framer Motion. Every duration and easing curve is
 * sourced from the design tokens (`motion.duration.*` / `motion.ease.*`) — never
 * hard-code animation values in a component.
 *
 * Reduced motion is handled globally by `<MotionProvider reducedMotion="user">`
 * (drops transform/scale, keeps opacity) and, for scroll reveals, by the
 * primitives rendering plain visible markup for those users.
 *
 * The `hidden` variant carries no transition and is byte-identical on server
 * and client, so `initial="hidden"` never causes a hydration mismatch.
 */

const { duration, ease } = tokens.motionRaw;

const standard = [...ease.standard] as [number, number, number, number];
const entrance = [...ease.entrance] as [number, number, number, number];

/** Named transitions for ad-hoc `animate` / `whileHover` use. */
export const transition = {
  fast: { duration: duration.fast, ease: standard } satisfies Transition,
  base: { duration: duration.base, ease: standard } satisfies Transition,
  slow: { duration: duration.slow, ease: standard } satisfies Transition,
};

/** Shared timing for every reveal. */
export const revealTiming: Transition = { duration: duration.slow, ease: entrance };

/** Distance (px) a revealing element travels, by direction. */
export const revealOffset = {
  bottom: { y: 24 },
  left: { x: -28 },
  right: { x: 28 },
} as const;

export type RevealFrom = keyof typeof revealOffset;

/** Scroll-reveal item: fade + rise. Used by <Reveal> and each <RevealItem>. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, ...revealOffset.bottom },
  visible: { opacity: 1, x: 0, y: 0, transition: revealTiming },
};

/**
 * Stagger container — no visual state of its own. Timing (`staggerChildren` /
 * `delayChildren`) is supplied per instance via the `transition` prop in
 * <StaggerGroup>.
 */
export const staggerVariants: Variants = {
  hidden: {},
  visible: {},
};
