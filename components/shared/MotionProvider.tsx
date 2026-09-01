"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide Framer Motion configuration.
 *
 * `reducedMotion="user"` makes every motion component respect the OS
 * "reduce motion" setting: transform/scale animations are dropped, opacity
 * transitions are kept. Wraps the whole tree but only adds a context provider —
 * server components passed as `children` stay server-rendered.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
