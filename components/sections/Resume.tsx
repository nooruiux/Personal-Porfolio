import { Section } from "@/components/layout";
import { Button, Card, Icon, SectionHeading } from "@/components/ui";
import { Reveal, RevealItem, StaggerGroup } from "@/components/shared/Reveal";
import { site } from "@/data/site";
import {
  awards,
  certifications,
  timeline,
  type TimelineEntry,
} from "@/data/experience";

function TimelineItem({
  entry,
  last,
}: {
  entry: TimelineEntry;
  last: boolean;
}) {
  return (
    <>
      {!last ? (
        <span
          aria-hidden
          className="absolute left-[19px] top-11 h-[calc(100%-2.5rem)] w-px bg-border-default"
        />
      ) : null}
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-default bg-surface-card">
        <Icon name={entry.icon} size="sm" color="brand" />
      </span>
      <div className="pt-1">
        <p className="text-sm font-medium text-text-secondary">
          {entry.period}
        </p>
        <h4 className="font-heading text-lg font-semibold text-text-primary">
          {entry.role}
        </h4>
        <p className="text-sm font-medium text-brand">{entry.org}</p>
        {entry.description ? (
          <p className="mt-2 text-sm text-text-secondary">
            {entry.description}
          </p>
        ) : null}
      </div>
    </>
  );
}

function TimelineGroup({
  label,
  entries,
}: {
  label: string;
  entries: TimelineEntry[];
}) {
  return (
    <div>
      <Reveal>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">
          {label}
        </h3>
      </Reveal>
      <StaggerGroup as="ol" gap={0.07}>
        {entries.map((entry, i) => (
          <RevealItem
            as="li"
            key={entry.id}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            <TimelineItem entry={entry} last={i === entries.length - 1} />
          </RevealItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

/**
 * Resume — experience + education timeline, certifications, and a prominent
 * download button. Data comes from data/experience.ts.
 */
export function Resume() {
  const work = timeline.filter((t) => t.kind === "work");
  const education = timeline.filter((t) => t.kind === "education");

  return (
    <Section id="resume" aria-label="Résumé">
      <Reveal>
        <SectionHeading
          eyebrow="Résumé"
          title="Experience & background"
          description="Four years across product teams and freelance clients."
        />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-10">
          <TimelineGroup label="Experience" entries={work} />
          <TimelineGroup label="Education" entries={education} />
        </div>

        <Reveal delay={0.1}>
          <Card className="flex flex-col gap-6">
            <div>
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                Get the full résumé
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                PDF · one page · updated {new Date().getFullYear()}
              </p>
              <Button
                href={site.resumePath}
                download
                className="mt-4 w-full"
                variant="primary"
              >
                <Icon name="download" size="sm" />
                Download Resume
              </Button>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">
                Training & courses
              </h4>
              <ul className="flex flex-col gap-3">
                {certifications.map((c) => (
                  <li key={c.id} className="text-sm">
                    <span className="font-medium text-text-primary">
                      {c.title}
                    </span>
                    <span className="text-text-secondary">
                      {" "}
                      — {c.issuer}, {c.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {awards.length ? (
              <div className="border-t border-border-default pt-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  Awards
                </h4>
                <ul className="flex flex-col gap-2">
                  {awards.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <Icon name="check" size="sm" color="brand" />
                      <span>
                        <span className="font-medium text-text-primary">
                          {a.title}
                        </span>{" "}
                        — {a.issuer}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
