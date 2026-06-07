/**
 * Generates a static sitemap.xml for Gandi static hosting.
 * Run after `npm run build:gandi` — writes to dist/client/sitemap.xml.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../dist/client");
const baseUrl = process.env.SITE_URL?.replace(/\/$/, "") ?? "";

const pages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/biography", changefreq: "monthly", priority: "0.8" },
  { path: "/scores", changefreq: "weekly", priority: "0.9" },
  { path: "/resources", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

const urls = pages
  .map((e) =>
    [
      "  <url>",
      `    <loc>${baseUrl}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  )
  .join("\n");

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  "</urlset>",
].join("\n");

writeFileSync(resolve(outDir, "sitemap.xml"), xml);
console.log(`[sitemap] Wrote ${pages.length} URLs to dist/client/sitemap.xml`);
