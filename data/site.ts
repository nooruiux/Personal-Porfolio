import type { BrandName } from "@/components/ui";

/**
 * Site-wide content. Edit copy here — never inside components.
 * Figures and history below are taken from Noor's CV.
 * Items marked `// TODO` still need confirmation.
 */

export const site = {
  name: "Noor Hossain",
  shortName: "Noor",
  role: "UI/UX Designer & Web Developer",
  // One-line value proposition shown in the hero.
  tagline:
    "I craft intuitive, visually captivating interfaces — and build them into fast, accessible websites and apps.",
  // Longer positioning line used in metadata / About.
  summary:
    "Passionate UI/UX designer with 4+ years of experience blending aesthetics with functionality to create seamless user experiences. My work spans website and mobile/tablet app UI/UX, wireframing, and prototyping — always focused on usability, visual craft, and a great end-to-end experience.",
  location: "Mirpur, Dhaka, Bangladesh",
  email: "noorxtk@gmail.com",
  phone: "+8801913264543",
  resumePath: "/resume.pdf",
  url: "https://noorhossain.com", // TODO: set real production domain before deploy

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/noorxtk/", brand: "linkedin" as BrandName },
    { label: "Behance", href: "https://www.behance.net/noorxtk", brand: "behance" as BrandName },
    { label: "Dribbble", href: "https://dribbble.com/Noorxtk", brand: "dribbble" as BrandName },
    { label: "Twitter", href: "https://twitter.com/noorxtk/", brand: "twitter" as BrandName },
  ],

  // From CV "Quick Facts".
  stats: [
    { value: "4+", label: "Years of experience" },
    { value: "40+", label: "Projects completed" },
    { value: "35+", label: "Happy clients" },
    { value: "164k+", label: "Project views" },
  ],

  // Header / in-page navigation. `href` values map to <Section id> values.
  // Resume deliberately excluded — the navbar has no Resume link/button;
  // the Résumé section's own download button is the only place it lives.
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
