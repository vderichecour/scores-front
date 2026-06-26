import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Public, dynamic sitemap. Generated on every request from the live `scores`
// table so newly published partitions are referenced without a rebuild.

const SITE_URL = (Deno.env.get("SITE_URL") ?? "https://clementportal.fr").replace(
  /\/$/,
  "",
);

const STATIC_PAGES: Array<{
  path: string;
  changefreq?: string;
  priority?: string;
}> = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/biography", changefreq: "monthly", priority: "0.8" },
  { path: "/scores", changefreq: "weekly", priority: "0.9" },
  { path: "/resources", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toUrlEntry(e: {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}): string {
  return [
    "  <url>",
    `    <loc>${SITE_URL}${e.path}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

interface ScoreRow {
  id: string;
  updated_at: string | null;
}

async function fetchScores(): Promise<ScoreRow[]> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseKey) {
    console.warn("[sitemap] Supabase env missing — returning static pages only.");
    return [];
  }
  const res = await fetch(
    `${supabaseUrl}/rest/v1/scores?select=id,updated_at&order=title.asc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    },
  );
  if (!res.ok) {
    console.error(`[sitemap] Supabase responded ${res.status}`);
    return [];
  }
  const rows = (await res.json()) as unknown;
  return Array.isArray(rows) ? (rows as ScoreRow[]) : [];
}

Deno.serve(async () => {
  let scorePages: Array<{
    path: string;
    lastmod?: string;
    changefreq: string;
    priority: string;
  }> = [];

  try {
    const scores = await fetchScores();
    scorePages = scores
      .filter((s) => s && s.id)
      .map((s) => ({
        path: `/scores/${encodeURIComponent(xmlEscape(s.id))}`,
        changefreq: "monthly",
        priority: "0.7",
        lastmod: s.updated_at
          ? new Date(s.updated_at).toISOString()
          : undefined,
      }));
  } catch (err) {
    console.error("[sitemap] Failed to build score pages:", err);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    [...STATIC_PAGES, ...scorePages].map(toUrlEntry).join("\n"),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
