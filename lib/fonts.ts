import { Inter, Sora } from "next/font/google";

/**
 * Fonts are self-hosted at build time via next/font (no external CDN request),
 * which eliminates layout shift and the render-blocking font fetch.
 *
 * The CSS variables declared here (`--font-sora`, `--font-inter`) are referenced
 * by the generated token `--font-family-heading` / `--font-family-body`.
 */

export const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${sora.variable} ${inter.variable}`;
