import { cn } from "@/lib/utils";

/**
 * SectionHeading — the eyebrow + title + description block that opens every
 * section. Keeps heading rhythm and hierarchy identical site-wide.
 *
 * @example
 * <SectionHeading
 *   eyebrow="Work"
 *   title="Selected projects"
 *   description="A few things I've designed and shipped."
 * />
 */
export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level for correct document outline. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </span>
      ) : null}
      <Heading
        id={id}
        className="max-w-2xl text-3xl font-bold text-text-primary sm:text-4xl"
      >
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-lg text-text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
