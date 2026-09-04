"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, Icon } from "@/components/ui";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Container } from "./Container";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  /**
   * Target for the "Book Appointment" CTA. Defaults to the in-page Contact
   * anchor (smooth-scrolls like the other nav links); pass an external
   * scheduling URL (e.g. Calendly) to point it elsewhere without touching markup.
   */
  bookingHref?: string;
}

/** Small dark circle badge + white rotated dash, next to the wordmark. */
function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-primary-dark"
    >
      <span className="h-1 w-4 -rotate-45 rounded-full bg-white" />
    </span>
  );
}

/**
 * Header — a floating pill-shaped nav bar (logo mark + wordmark left, links
 * centered, theme toggle + "Book Appointment" CTA right) that escalates from
 * a plain card to a condensed, frosted, shadowed pill on scroll. Nav items
 * come from `site.nav`. Mobile collapses to logo + hamburger only — nav links
 * and the CTA live in the existing drawer there (which also holds the theme
 * toggle).
 *
 * There is no Resume link or download button anywhere in this component —
 * the Résumé section owns its own download button.
 *
 * @example
 * <Header />                              // Book Appointment -> #contact
 * <Header bookingHref="https://cal.com/noor" />
 */
export function Header({ bookingHref = "#contact" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // rAF-coalesced: a burst of scroll events schedules at most one state check
    // per frame. `pending` also guards against redundant work when scrollY
    // stays on one side of the threshold.
    let pending = false;
    const sync = () => {
      pending = false;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-4">
      <Container>
        <nav
          className={cn(
            "relative mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-4 transition duration-base ease-standard sm:px-6",
            scrolled
              ? "h-14 border-border-default bg-surface-scrim shadow-md backdrop-blur-md"
              : "h-16 border-border-default bg-surface-card shadow-sm",
          )}
        >
          {/* Left: logo — always visible */}
          <Link
            href="#top"
            className="flex shrink-0 items-center gap-2.5 font-heading text-lg font-bold tracking-tight text-text-primary"
          >
            <LogoMark />
            <span>
              {site.shortName}
              <span className="text-brand">.</span>
            </span>
          </Link>

          {/* Center: nav links, dot-separated, truly centered regardless of
              how wide the left/right zones are. Desktop only. Bold uppercase
              tracked labels, per the reference's nav treatment (fluid
              clamp() size — deliberately not a token; see globals.css note
              near .chamfer-btn for the project's precedent on one-off
              decorative values like this). */}
          <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-3 lg:flex">
            {site.nav.map((item, i) => (
              <li key={item.href} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden="true" className="text-sm text-text-secondary">
                    ·
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="relative rounded-md px-1 py-2 text-[clamp(0.75rem,0.6rem+0.4vw,0.9375rem)] font-bold uppercase tracking-[0.06em] text-text-secondary transition duration-fast ease-standard after:absolute after:inset-x-1 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-base after:ease-standard after:content-[''] hover:text-text-primary hover:after:scale-x-100 focus-visible:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: theme toggle + Book Appointment — nothing else. Desktop only. */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <ThemeToggle />
            <Button href={bookingHref} size="sm" variant="primary" shape="chamfer" arrow>
              Book Appointment
            </Button>
          </div>

          {/* Mobile: hamburger replaces both the nav links and the CTA —
              both live in the drawer (which already has its own Book
              Appointment button + the theme toggle). */}
          <div className="flex shrink-0 items-center lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-default text-text-primary"
            >
              <Icon name="menu" size="md" />
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full bg-black/40"
            />
            <motion.div
              id="mobile-menu"
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col gap-2 border-l border-border-default bg-surface-card p-6"
              initial={reduceMotion ? undefined : { x: "100%" }}
              animate={reduceMotion ? undefined : { x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2.5 font-heading text-lg font-bold text-text-primary">
                  <LogoMark />
                  <span>
                    {site.shortName}
                    <span className="text-brand">.</span>
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-default text-text-primary"
                  >
                    <Icon name="x" size="md" />
                  </button>
                </div>
              </div>

              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ))}

              <Button
                href={bookingHref}
                variant="primary"
                shape="chamfer"
                arrow
                className="mt-4"
                onClick={() => setOpen(false)}
              >
                Book Appointment
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
