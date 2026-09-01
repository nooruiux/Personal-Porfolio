import { Header, Footer } from "@/components/layout";
import {
  About,
  Contact,
  Hero,
  Projects,
  Resume,
  Skills,
  Tools,
} from "@/components/sections";
import { site } from "@/data/site";

/**
 * Single-page portfolio. Section order is defined here; each section owns its
 * own layout and pulls content from /data.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Tools />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <PersonJsonLd />
    </>
  );
}

/** Structured data so search engines understand who this page is about. */
function PersonJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
    sameAs: site.socials.map((s) => s.href),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
