import { Section } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/shared/Reveal";
import { site } from "@/data/site";

/**
 * About — short bio, photo placeholder, and key stats.
 */
export function About() {
  return (
    <Section id="about" aria-label="About Noor">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="order-2 lg:order-1">
          {/* TODO: replace with a real photo at /public/noor.jpg via next/image */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border border-border-default bg-surface-muted">
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-heading text-6xl font-bold text-brand">
                {site.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading
            eyebrow="About"
            title="Design that blends aesthetics with function"
          />
          <Reveal>
            <p className="text-lg text-text-secondary">{site.summary}</p>
          </Reveal>

          <Reveal>
            <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-3xl font-bold text-text-primary">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-text-secondary">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
