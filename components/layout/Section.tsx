import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Section — vertical rhythm wrapper used by every page section so spacing is
 * decided once, not per-section. Renders a landmark `<section>` with an
 * anchor id (for the nav) and scroll offset for the sticky header.
 *
 * @example
 * <Section id="about" aria-label="About">
 *   …
 * </Section>
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Anchor id used by the header nav (e.g. "about"). */
  id: string;
  /** Use the subtle alternating background. */
  muted?: boolean;
  /** Set false to render children without the inner <Container>. */
  contained?: boolean;
}

export function Section({
  id,
  muted = false,
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 sm:py-24",
        muted ? "bg-surface-muted" : "bg-surface-bg",
        className,
      )}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
