/**
 * optimize-images.mjs
 * -----------------------------------------------------------------------------
 * One-time asset import: takes the full-resolution project mockups from an
 * external source folder, resizes + compresses them to web-ready WebP, and
 * writes them into public/projects/ (which IS committed).
 *
 * A future dev without the source folder can ignore this — the optimized
 * WebP files are already in the repo. Re-run only when adding/replacing a
 * project image. Run: `npm run images`
 * -----------------------------------------------------------------------------
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const OUT = resolve(root, "public/projects");

// TODO: update if the source mockups move.
const SOURCE_DIR = "C:/Users/Noor/Desktop/UIUX Portfolio";

/** [source file name, output slug] — output slug matches data/projects.ts id. */
const JOBS = [
  ["Crypto Management Dashboard.png", "crypto-management-dashboard"],
  ["Finance Management App.jpg", "finance-management-app"],
  ["Could dashboard.png", "cloud-analytics-dashboard"],
  ["Travel Booking App.png", "travel-booking-app"],
  ["Ecommerce.jpg", "ecommerce-storefront"],
  ["SaaS.jpg", "saas-landing-platform"],
  ["Marketing Agency.png", "marketing-agency-site"],
  ["project management.jpg", "project-management-tool"],
];

mkdirSync(OUT, { recursive: true });

let done = 0;
for (const [file, slug] of JOBS) {
  const src = resolve(SOURCE_DIR, file);
  if (!existsSync(src)) {
    console.warn(`• skip ${slug} — source not found (${file})`);
    continue;
  }
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(resolve(OUT, `${slug}.webp`));
  done += 1;
  console.log(`✓ ${slug}.webp`);
}
console.log(`\n${done}/${JOBS.length} images written to public/projects/`);
