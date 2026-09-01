import type { IconName } from "@/components/ui";

/**
 * The four core service areas shown as cards in the Skills section.
 * Edit titles / descriptions / bullet lists here.
 */

export interface Skill {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  highlights: string[];
}

export const skills: Skill[] = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: "pen-tool",
    description:
      "End-to-end product design — from research and user flows to wireframes, high-fidelity UI, and interactive prototypes.",
    highlights: ["UX research", "Wireframing", "Prototyping", "Design systems"],
  },
  {
    id: "web",
    title: "Web Design & Development",
    icon: "code",
    description:
      "Responsive marketing sites and web apps designed for clarity and conversion, then built with modern, accessible front-end code.",
    highlights: ["Responsive design", "Next.js / React", "Tailwind CSS", "Performance"],
  },
  {
    id: "app",
    title: "App Design",
    icon: "smartphone",
    description:
      "Native-feeling mobile and tablet interfaces — considered navigation, states, and micro-interactions that make apps easy to use.",
    highlights: ["iOS & Android patterns", "Interaction design", "Design handoff"],
  },
  {
    id: "social",
    title: "Social Media Design",
    icon: "megaphone",
    description:
      "On-brand social and ad creative — templates and campaigns that stay consistent across formats and scale to a content calendar.",
    highlights: ["Ad creative", "Brand templates", "Campaign kits"],
  },
];
