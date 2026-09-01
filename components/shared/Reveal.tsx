"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  revealOffset,
  revealTiming,
  revealVariants,
  staggerVariants,
  type RevealFrom,
} from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";

/**
 * Scroll-reveal primitives (Framer Motion).
 *
 * Robustness model — the fallback is always *visible content*:
 * - Server + hydration render a plain `<div>` (identical markup, no mismatch).
 * - After mount, users with `prefers-reduced-motion` keep the plain `<div>` —
 *   nothing depends on Framer's animation loop or IntersectionObserver for them.
 * - Everyone else gets a `motion.div` that fades + rises as it scrolls into view
 *   (`whileInView`, once).
 *
 * So if JS fails after hydration, an observer never fires, or animation is
 * frozen, content is still there — it just doesn't animate.
 *
 * @example
 * <Reveal>{block}</Reveal>
 *
 * <StaggerGroup className="grid gap-6" gap={0.08}>
 *   {items.map((i) => <RevealItem key={i.id}>{card(i)}</RevealItem>)}
 * </StaggerGroup>
 */

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra seconds of delay before this element animates in. */
  delay?: number;
  /** Fraction of the element visible before it triggers (0–1). */
  amount?: number;
  /** Direction the element travels from. Default "bottom" (fade + rise). */
  from?: RevealFrom;
}

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  from = "bottom",
}: RevealProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...revealOffset[from] },
        visible: { opacity: 1, x: 0, y: 0, transition: revealTiming },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  gap?: number;
  /** Seconds before the first child animates. */
  delay?: number;
  amount?: number;
}

export function StaggerGroup({
  children,
  className,
  gap = 0.09,
  delay = 0.04,
  amount = 0.15,
}: StaggerGroupProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: gap, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Direct child of a <StaggerGroup>. Renders plain when its group does; inside an
 * animating group it inherits the group's state and animates on its turn.
 */
export function RevealItem({ children, className }: RevealItemProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={revealVariants}>
      {children}
    </motion.div>
  );
}
