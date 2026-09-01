"use client";

import { Icon } from "@/components/ui";

type Theme = "light" | "dark";

/**
 * ThemeToggle — flips `data-theme` on <html>, which swaps the color tokens.
 * No rebuild, no re-theming of components: the entire palette is CSS variables.
 *
 * State lives in the DOM (set before hydration by the inline script in
 * app/layout.tsx), not in React — so there's nothing to sync and no flash.
 * The sun/moon swap is handled by the `dark:` variant in CSS.
 */
export function ThemeToggle() {
  function toggle() {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ??
      "light";
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore private-mode storage errors */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-default text-text-secondary transition duration-fast ease-standard hover:border-brand hover:text-brand"
      aria-label="Toggle light and dark theme"
    >
      <Icon name="sun" size="md" className="dark:hidden" />
      <Icon name="moon" size="md" className="hidden dark:block" />
    </button>
  );
}
