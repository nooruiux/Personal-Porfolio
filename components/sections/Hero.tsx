import { Button, Icon } from "@/components/ui";
import { Container } from "@/components/layout";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Left-indent step per headline line index — a "staircase" cascade. Capped at
 * 5 entries (site.heroHeadlineLines' current length); disabled below `sm` so
 * the indent doesn't eat into the already-narrow mobile width.
 */
const STAIRCASE_INDENTS = ["", "sm:ml-4", "sm:ml-8", "sm:ml-12", "sm:ml-16"];

/**
 * Hero — left-aligned intro block (badge, staircase headline, subheadline,
 * two CTAs) over a soft animated purple gradient + dotted grid. Visual
 * hierarchy: badge -> large staircase headline (the page's <h1>, each line
 * progressively indented, last line in brand purple) -> subheadline -> CTAs.
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
      {/* Ambient background — three slow-drifting brand blobs + a faint grid. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-blob hero-blob--1 left-[-10%] top-[-14%] h-[26rem] w-[26rem] bg-brand" />
        <div className="hero-blob hero-blob--2 right-[-8%] top-[8%] h-80 w-80 bg-brand-accent" />
        <div className="hero-blob hero-blob--3 bottom-[-24%] left-1/3 h-[30rem] w-[30rem] bg-brand-primary-dark" />
        <div className="grid-overlay absolute inset-0 opacity-60" />
      </div>

      <Container>
        <div className="flex max-w-3xl flex-col items-start text-left">
          <span
            className="animate-rise inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-card px-4 py-1.5 text-sm font-medium text-text-secondary"
            style={{ animationDelay: "0ms" }}
          >
            <Icon name="sparkles" size="sm" color="brand" />
            Available for freelance &amp; full-time work
          </span>

          <h1
            className="animate-rise mt-5 text-3xl font-bold uppercase leading-none tracking-tight text-text-primary sm:text-4xl"
            style={{ animationDelay: "80ms" }}
          >
            {site.heroHeadlineLines.map((line, i) => (
              <span
                key={line}
                className={cn(
                  "block py-1",
                  STAIRCASE_INDENTS[i],
                  i === site.heroHeadlineLines.length - 1 && "text-brand",
                )}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className="animate-rise mt-5 max-w-2xl text-lg text-text-secondary"
            style={{ animationDelay: "160ms" }}
          >
            {site.tagline}
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="#work" size="lg" shape="chamfer" arrow>
              View Work
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
