import Image from "next/image";
import { Section } from "@/components/layout";
import { Badge, Icon, SectionHeading, Tag } from "@/components/ui";
import { RevealItem, StaggerGroup } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { featuredProjects, type Project } from "@/data/projects";
import { site } from "@/data/site";

const cardClass =
  "group flex h-full flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card transition duration-base ease-standard";
const linkableCardClass =
  "hover:-translate-y-1 hover:border-brand hover:shadow-glow";

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          width={project.imageWidth}
          height={project.imageHeight}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover object-top transition duration-slow ease-standard group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="brand">{project.category}</Badge>
          {project.year ? (
            <span className="text-sm text-text-secondary">{project.year}</span>
          ) : null}
        </div>
        <h3 className="flex items-center gap-1.5 font-heading text-lg font-semibold text-text-primary">
          {project.title}
          {project.href ? (
            <Icon
              name="arrow-up-right"
              size="sm"
              color="secondary"
              className="transition group-hover:text-brand"
            />
          ) : null}
        </h3>
        <p className="text-sm text-text-secondary">{project.blurb}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((t) => (
            <li key={t}>
              <Tag className="text-xs">{t}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(cardClass, linkableCardClass)}
      >
        {body}
      </a>
    );
  }
  return <div className={cardClass}>{body}</div>;
}

/**
 * Projects — grid of featured work. Content lives in data/projects.ts; this
 * component only lays it out.
 */
export function Projects() {
  const behance = site.socials.find((s) => s.label === "Behance")?.href ?? "#";

  return (
    <Section id="work" muted aria-label="Selected work">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          description="Dashboards, apps, and sites I've designed. Some copy is placeholder where project details aren't public yet."
        />
        <a
          href={behance}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-primary-dark"
        >
          More on Behance
          <Icon name="arrow-up-right" size="sm" />
        </a>
      </div>

      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <RevealItem key={project.id}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
