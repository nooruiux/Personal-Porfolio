import type { Metadata, Viewport } from "next";
import "../design-system/generated/tokens.css";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.summary,
  keywords: [
    "UI/UX Designer",
    "Web Developer",
    "Product Designer",
    "Figma",
    "Next.js",
    site.name,
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.summary,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0D13" },
  ],
};

// Sets the theme before first paint so there's no flash of the wrong palette.
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',d);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
