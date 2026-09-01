import { Section } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import { Reveal, RevealItem } from "@/components/shared/Reveal";
import { tools } from "@/data/tools";

/**
 * Tools — the software Noor works in, with a subtle proficiency bar.
 */
export function Tools() {
  return (
    <Section id="tools" aria-label="Tools">
      <SectionHeading
        eyebrow="Toolbox"
        title="Tools I design with"
        description="Proficiency levels are self-assessed, from Noor's CV."
      />

      <Reveal
        stagger
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool) => (
          <RevealItem key={tool.id}>
            <div className="flex h-full items-center gap-4 rounded-lg border border-border-default bg-surface-card p-5">
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand-tint font-heading text-lg font-bold text-brand"
              >
                {tool.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-text-primary">
                  {tool.name}
                </p>
                <p className="truncate text-sm text-text-secondary">
                  {tool.role}
                </p>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted"
                  role="progressbar"
                  aria-valuenow={tool.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${tool.name} proficiency`}
                >
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${tool.level}%` }}
                  />
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
