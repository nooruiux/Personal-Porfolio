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

/**
 * Header — sticky site navigation with a résumé download, a "Book Appointment"
 * CTA (smooth-scrolls to the Contact section by default), a theme toggle, and
 * an animated mobile drawer. Nav items come from `site.nav`.
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
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition duration-base ease-standard",
        scrolled
          ? "border-border-default bg-surface-scrim shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent shadow-none",
      )}
    >
      <Container
        as="nav"
        className={cn(
          "flex items-center justify-between gap-4 transition-[height] duration-base ease-standard",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link
          href="#top"
          className="font-heading text-lg font-bold tracking-tight text-text-primary"
        >
          {site.shortName}
          <span className="text-brand">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition duration-fast ease-standard after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-base after:ease-standard after:content-[''] hover:text-text-primary hover:after:scale-x-100 focus-visible:after:scale-x-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button href={site.resumePath} download size="sm" variant="outline">
            <Icon name="download" size="sm" />
            Resume
          </Button>
          <Button href={bookingHref} size="sm" variant="primary">
            Book Appointment
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-default text-text-primary"
          >
            <Icon name="menu" size="md" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
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
                <span className="font-heading text-lg font-bold text-text-primary">
                  {site.shortName}
                  <span className="text-brand">.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-default text-text-primary"
                >
                  <Icon name="x" size="md" />
                </button>
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
                href={site.resumePath}
                download
                variant="outline"
                className="mt-4"
                onClick={() => setOpen(false)}
              >
                <Icon name="download" size="sm" />
                Download Resume
              </Button>
              <Button
                href={bookingHref}
                variant="primary"
                className="mt-2"
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
