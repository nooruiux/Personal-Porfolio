/**
 * Portfolio projects.
 *
 * Images live in /public/projects/<id>.webp (imported + optimized from
 * `C:/Users/Noor/Desktop/UIUX Portfolio` via `npm run images`).
 *
 * Each entry's copy is a best-effort description of the mockup. Anything a
 * visitor would take as fact about the engagement — client, year, role, live
 * URL — is marked `// TODO: confirm details`. Replace with real data.
 */

export interface Project {
  /** Stable id — matches the image file name in /public/projects. */
  id: string;
  title: string;
  /** Single category shown as a tag on the card. */
  category: string;
  /** 1–2 sentence card blurb. */
  blurb: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** Skills/tools shown as small tags on the card. */
  tags: string[];
  /** Case-study or live link. `undefined` renders a non-linked card. */
  href?: string;
  /** Show in the primary grid. */
  featured: boolean;
  year?: string;
}

const IMG = { imageWidth: 1600, imageHeight: 1200 };

export const projects: Project[] = [
  {
    id: "crypto-management-dashboard",
    title: "Crypto Management Dashboard",
    category: "Product UI",
    blurb:
      "A dark-theme dashboard for tracking a crypto portfolio — balances, allocation, and market movement surfaced at a glance.",
    image: "/projects/crypto-management-dashboard.webp",
    ...IMG,
    tags: ["UI Design", "Data Viz", "Design System"],
    featured: true,
    year: "2025", // TODO: confirm details
    href: undefined, // TODO: add case study / live link
  },
  {
    id: "finance-management-app",
    title: "Finance Management App",
    category: "Mobile App",
    blurb:
      "A personal-finance mobile app concept covering budgets, spending insights, and goal tracking with a calm, focused flow.",
    image: "/projects/finance-management-app.webp",
    ...IMG,
    tags: ["App Design", "UX Flows", "Prototyping"],
    featured: true,
    year: "2025", // TODO: confirm details
  },
  {
    id: "cloud-analytics-dashboard",
    title: "Cloud Analytics Dashboard",
    category: "Product UI",
    blurb:
      "An analytics console for cloud infrastructure — usage, cost, and health metrics organized for fast scanning and drill-down.",
    image: "/projects/cloud-analytics-dashboard.webp",
    ...IMG,
    tags: ["UI Design", "Dashboard", "Design System"],
    featured: true,
    year: "2025", // TODO: confirm details
  },
  {
    id: "travel-booking-app",
    title: "Travel Booking App",
    category: "Mobile App",
    blurb:
      "A travel-booking app concept — search, compare, and book stays and flights with a clean, image-led browsing experience.",
    image: "/projects/travel-booking-app.webp",
    ...IMG,
    tags: ["App Design", "UX Research", "Prototyping"],
    featured: true,
    year: "2024", // TODO: confirm details
  },
  {
    id: "ecommerce-storefront",
    title: "E-commerce Storefront",
    category: "Web Design",
    blurb:
      "A modern storefront design — product discovery, PDP, and checkout laid out for conversion and a confident brand feel.",
    image: "/projects/ecommerce-storefront.webp",
    ...IMG,
    tags: ["Web Design", "UI Design", "Responsive"],
    featured: true,
    year: "2024", // TODO: confirm details
  },
  {
    id: "saas-landing-platform",
    title: "SaaS Marketing Site",
    category: "Web Design",
    blurb:
      "A marketing site for a SaaS product — hero, feature storytelling, pricing, and social proof built on a reusable section system.",
    image: "/projects/saas-landing-platform.webp",
    ...IMG,
    tags: ["Web Design", "Landing Page", "Webflow"], // TODO: confirm build tool
    featured: true,
    year: "2024", // TODO: confirm details
  },
  {
    id: "marketing-agency-site",
    title: "Marketing Agency Website",
    category: "Web Design",
    blurb:
      "A bold agency website concept — expressive typography and motion balanced against clear service and case-study structure.",
    image: "/projects/marketing-agency-site.webp",
    ...IMG,
    tags: ["Web Design", "Art Direction", "Motion"],
    featured: false,
    year: "2024", // TODO: confirm details
  },
  {
    id: "project-management-tool",
    title: "Project Management Tool",
    category: "Product UI",
    blurb:
      "A team project-management interface — boards, timelines, and task detail designed for dense information without clutter.",
    image: "/projects/project-management-tool.webp",
    ...IMG,
    tags: ["UI Design", "UX Flows", "Design System"],
    featured: false,
    year: "2024", // TODO: confirm details
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
