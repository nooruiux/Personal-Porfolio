"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealVariants, staggerContainer } from "@/lib/motion";
import { useIsClient } from "@/lib/use-is-client";

/**
 * Reveal — scroll-into-view animation wrapper (fade + rise).
 *
 * Renders children statically on the server and during hydration (so content
 * is always in the HTML and there's no mismatch), then animates on scroll once
 * mounted on the client. Honors `prefers-reduced-motion`.
 *
 * @example
 * <Reveal>{card}</Reveal>
 * <Reveal stagger>{items.map((i) => <RevealItem key={i}>…</RevealItem>)}</Reveal>
 */
export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra delay in seconds before this element animates. */
  delay?: number;
  /** Treat children as a list and stagger them. Children should be <RevealItem>. */
  stagger?: boolean;
}

export function Reveal({ children, className, delay = 0, stagger }: RevealProps) {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();

  if (!isClient || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of a `<Reveal stagger>` container. */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();

  if (!isClient || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={revealVariants}>
      {children}
    </motion.div>
  );
}
