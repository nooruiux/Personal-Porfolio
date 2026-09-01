import { Section } from "@/components/layout";
import { Card, Icon, SectionHeading, Tag } from "@/components/ui";
import { Reveal, RevealItem } from "@/components/shared/Reveal";
import { skills } from "@/data/skills";

/**
 * Skills — the four core service areas as icon cards.
 */
export function Skills() {
  return (
    <Section id="skills" muted aria-label="Skills and services">
      <SectionHeading
        eyebrow="What I do"
        title="Skills & services"
        description="Four areas I work across — often on the same project, from first sketch to shipped product."
      />

      <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2">
        {skills.map((skill) => (
          <RevealItem key={skill.id}>
            <Card as="article" interactive className="flex h-full flex-col gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-tint">
                <Icon name={skill.icon} size="lg" color="brand" />
              </span>
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                {skill.title}
              </h3>
              <p className="text-text-secondary">{skill.description}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {skill.highlights.map((h) => (
                  <li key={h}>
                    <Tag>{h}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
