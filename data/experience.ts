import type { IconName } from "@/components/ui";

/**
 * Résumé timeline + certifications. Sourced from resume-source.pdf.
 */

export interface TimelineEntry {
  id: string;
  kind: "work" | "education";
  role: string;
  org: string;
  period: string;
  description?: string;
  icon: IconName;
}

export const timeline: TimelineEntry[] = [
  {
    id: "superbooking",
    kind: "work",
    role: "UI/UX Designer",
    org: "SuperBooking AI",
    period: "Jan 2024 – May 2025",
    description:
      "Designed product UI and flows for an AI-powered booking platform — from concept and wireframes to polished, developer-ready screens.",
    icon: "briefcase",
  },
  {
    id: "innov7lab",
    kind: "work",
    role: "UI/UX Designer",
    org: "Innov7Lab",
    period: "Aug 2022 – Jan 2024",
    description:
      "Worked across web and mobile projects — research, interface design, and design systems for a range of client products.",
    icon: "briefcase",
  },
  {
    id: "upwork",
    kind: "work",
    role: "UI/UX Designer — Freelance",
    org: "Upwork",
    period: "2021 – Present",
    description:
      "Ongoing freelance UI/UX work for international clients: websites, mobile apps, and social/ad creative.",
    icon: "briefcase",
  },
  {
    id: "msc-physics",
    kind: "education",
    role: "M.Sc. in Physics",
    org: "National University",
    period: "2016 · CGPA 3.53/4",
    icon: "graduation",
  },
  {
    id: "bsc-physics",
    kind: "education",
    role: "B.Sc. (Honours) in Physics",
    org: "National University",
    period: "2015 · CGPA 3.22/4",
    icon: "graduation",
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export const certifications: Certification[] = [
  { id: "figma-udemy", title: "Figma UI/UX Design — Advanced", issuer: "Udemy", year: "2020" },
  { id: "ux-coursera", title: "User Experience Design (UX)", issuer: "Coursera", year: "2021" },
  { id: "interaction-skillshare", title: "Advanced Interaction Design", issuer: "Skillshare", year: "2022" },
];

/** From CV "Awards & Achievements". */
export const awards = [
  { id: "instructor", title: "Best UI/UX Instructor", issuer: "Talentive IT Institute" },
];
