import { Button, Icon } from "@/components/ui";
import { Container } from "@/components/layout";
import { site } from "@/data/site";

/**
 * Hero — name, role, one-line value proposition and the two primary CTAs,
 * over a soft animated purple gradient + dotted grid.
 *
 * Content is server-rendered and animated in with a pure-CSS entrance
 * (`.animate-rise`) — no JS, no layout shift, visible without hydration.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36"
    >
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="hero-blob left-[-8%] top-[-10%] h-72 w-72 bg-brand"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="hero-blob right-[-6%] top-[20%] h-80 w-80 bg-brand-accent"
          style={{ animationDelay: "-6s" }}
        />
        <div className="grid-overlay absolute inset-0 opacity-60" />
      </div>

      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span
            className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-card px-4 py-1.5 text-sm font-medium text-text-secondary"
            style={{ animationDelay: "0ms" }}
          >
            <Icon name="sparkles" size="sm" color="brand" />
            Available for freelance &amp; full-time work
          </span>

          <h1
            className="animate-rise text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {site.name}
          </h1>

          <p
            className="animate-rise mt-3 text-xl font-semibold text-brand sm:text-2xl"
            style={{ animationDelay: "120ms" }}
          >
            {site.role}
          </p>

          <p
            className="animate-rise mt-5 max-w-2xl text-lg text-text-secondary"
            style={{ animationDelay: "180ms" }}
          >
            {site.tagline}
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="#work" size="lg">
              View Work
              <Icon name="arrow-right" size="sm" />
            </Button>
            <Button href={site.resumePath} download size="lg" variant="outline">
              <Icon name="download" size="sm" />
              Download Resume
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
