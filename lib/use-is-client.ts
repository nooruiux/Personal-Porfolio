import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns `false` during SSR and the first client render, then `true`.
 * Lets a component render identical markup on the server and during
 * hydration, then opt into client-only behaviour (e.g. animation) after —
 * without a setState-in-effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
