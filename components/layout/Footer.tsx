import Link from "next/link";
import { BrandIcon, Icon } from "@/components/ui";
import { Container } from "./Container";
import { site } from "@/data/site";

/**
 * Footer — social links, copyright, and a back-to-top link.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-default bg-surface-bg">
      <Container className="flex flex-col items-center gap-6 py-12 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-heading text-base font-bold text-text-primary">
            {site.name}
          </p>
          <p className="text-sm text-text-secondary">
            © {year} · {site.role}
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-default text-text-secondary transition duration-fast ease-standard hover:border-brand hover:text-brand"
              >
                <BrandIcon name={social.brand} size="md" />
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="#top"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition duration-fast ease-standard hover:text-brand"
        >
          Back to top
          <Icon name="arrow-up" size="sm" />
        </Link>
      </Container>
    </footer>
  );
}
