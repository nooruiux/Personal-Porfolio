import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during SSR and the first client render, `true` afterwards.
 *
 * Lets a component render identical markup on the server and during hydration
 * (avoiding a mismatch), then switch to client-only behaviour once mounted —
 * without a setState-in-effect. Used by the scroll-reveal primitives so their
 * fallback state (plain, visible content) is what the server sends.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
