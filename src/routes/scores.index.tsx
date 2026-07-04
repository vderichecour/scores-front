import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/scores/")({
  head: () => ({
    meta: [
      { title: "Partitions — Clément Portal" },
      {
        name: "description",
        content:
          "Catalogue de partitions liturgiques réalisé par Clément Portal, librement accessible.",
      },
      { property: "og:title", content: "Partitions — Clément Portal" },
      {
        property: "og:description",
        content:
          "Partitions liturgiques librement accessibles.",
      },
    ],
  }),
  component: ScoresPage,
});

type Score = {
  id: string;
  title: string;
  author: string | null;
  composer: string;
  pdf_path: string;
  labels: string[] | null;
  created_at: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

function pdfUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/scores/${path}`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

const ALL = "__all__";

const PAGE_SIZE = 10;

type PageItem = number | "ellipsis";

function getPageNumbers(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: PageItem[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

function ScoresPage() {
  const [scores, setScores] = useState<Score[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [composer, setComposer] = useState<string>(ALL);
  const [author, setAuthor] = useState<string>(ALL);
  const [label, setLabel] = useState<string>(ALL);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    supabase
      .from("scores")
      .select("id,title,author,composer,pdf_path,labels,created_at")
      .order("title", { ascending: true })
      .then(({ data }) => setScores((data as Score[] | null) ?? []));
  }, []);


  const composers = useMemo(
    () =>
      Array.from(new Set((scores ?? []).map((s) => s.composer).filter(Boolean))).sort(),
    [scores],
  );
  const authors = useMemo(
    () =>
      Array.from(
        new Set((scores ?? []).map((s) => s.author ?? "").filter((a) => a !== "")),
      ).sort(),
    [scores],
  );
  const labels = useMemo(
    () =>
      Array.from(
        new Set((scores ?? []).flatMap((s) => s.labels ?? [])),
      ).sort(),
    [scores],
  );

  const filtered = useMemo(() => {
    if (!scores) return null;
    const q = query.trim().toLowerCase();
    return scores.filter((s) => {
      if (composer !== ALL && s.composer !== composer) return false;
      if (author !== ALL && (s.author ?? "") !== author) return false;
      if (label !== ALL && !(s.labels ?? []).includes(label)) return false;
      if (q) {
        const haystack = [
          s.title,
          s.author ?? "",
          s.composer,
          ...(s.labels ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [scores, query, composer, author, label]);

  useEffect(() => {
    setPage(1);
  }, [query, composer, author, label]);

  const totalPages = filtered ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    if (!filtered) return null;
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const resultsSummary = useMemo(() => {
    if (!filtered || filtered.length === 0) return null;
    return filtered.length === 1
      ? "1 partition"
      : `${filtered.length} partitions`;
  }, [filtered]);

  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const pagination =
    filtered && totalPages > 1 ? (
      <nav className="flex items-center justify-end gap-1.5" aria-label="Pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="px-3 py-2 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Page précédente"
        >
          ‹
        </button>
        {pageNumbers.map((item, i) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 font-mono text-xs opacity-50"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => setPage(item)}
              aria-current={item === currentPage ? "page" : undefined}
              className={`min-w-[2.5rem] px-3 py-2 border text-[11px] font-mono transition-all ${
                item === currentPage
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {item}
            </button>
          ),
        )}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className="px-3 py-2 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Page suivante"
        >
          ›
        </button>
      </nav>
    ) : null;

  const resetFilters = () => {
    setQuery("");
    setComposer(ALL);
    setAuthor(ALL);
    setLabel(ALL);
  };
  const hasActiveFilter =
    query.trim() !== "" || composer !== ALL || author !== ALL || label !== ALL;

  const selectClass =
    "w-full border border-foreground bg-transparent px-3 py-2 text-sm font-mono";

  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <header className="mb-8 md:mb-10 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Partitions
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance max-w-4xl mb-6">
            Un catalogue au service de la liturgie.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-80">
            Partitions harmonisées, composées ou rééditées, librement accessibles pour un usage liturgique.
            Merci de me prévenir pour tout autre usage.
          </p>
        </header>

        <section className="animate-reveal [animation-delay:200ms]">
          {scores && scores.length > 0 && (
            <div className="mb-6">
              <label className="block text-[10px] font-mono uppercase tracking-widest mb-2 opacity-70">
                Recherche
              </label>
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Titre, auteur, compositeur, étiquette…"
                  className="w-full border-2 border-foreground bg-transparent pl-12 pr-4 py-3 text-base font-mono placeholder:opacity-40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors"
                />
              </div>
            </div>
          )}

          {scores && scores.length > 0 && (
            <div className="mb-8 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] items-end">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
                  Compositeur
                </label>
                <select
                  value={composer}
                  onChange={(e) => setComposer(e.target.value)}
                  className={selectClass}
                >
                  <option value={ALL}>Tous</option>
                  {composers.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
                  Auteur
                </label>
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className={selectClass}
                >
                  <option value={ALL}>Tous</option>
                  {authors.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
                  Étiquette
                </label>
                <select
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className={selectClass}
                >
                  <option value={ALL}>Toutes</option>
                  {labels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              {hasActiveFilter && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          )}

          {scores === null ? (
            <p className="py-12 text-sm font-mono opacity-60">Chargement…</p>
          ) : filtered && filtered.length === 0 ? (
            <p className="py-12 text-sm opacity-60">
              {scores.length === 0
                ? "Aucune partition disponible pour le moment."
                : "Aucune partition ne correspond à ces filtres."}
            </p>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between gap-4">
                <p className="text-sm font-mono uppercase tracking-widest opacity-60">
                  {resultsSummary}
                </p>
                {pagination}
              </div>
              <div className="divide-y divide-border">
              {paginated!.map((s) => (
                <article
                  key={s.id}
                  className="group grid grid-cols-12 py-6 md:py-8 items-baseline md:items-center gap-y-3 gap-x-4 hover:bg-accent/[0.03] transition-colors px-2 -mx-2 md:px-4 md:-mx-4"
                >
                  <div className="col-span-3 md:col-span-1 font-mono text-[11px] md:text-xs opacity-40 whitespace-nowrap">
                    {formatDate(s.created_at)}
                  </div>

                  <div className="col-span-9 md:col-span-5">
                    <h3 className="text-xl md:text-2xl font-display font-semibold group-hover:text-accent transition-colors">
                      <Link to="/scores/$slug" params={{ slug: s.id }} className="hover:underline">
                        {s.title}
                      </Link>
                    </h3>
                    {s.author && (
                      <p className="text-sm italic opacity-60">{s.author}</p>
                    )}
                    {s.labels && s.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {s.labels.map((l) => (
                          <button
                            key={l}
                            onClick={() => setLabel(l)}
                            className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-foreground/30 hover:border-accent hover:text-accent transition-colors"
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-4 font-mono text-xs md:text-sm opacity-75">
                    {s.composer}
                  </div>
                  <div className="col-span-12 md:col-span-2 md:text-right">
                    <a
                      href={pdfUrl(s.pdf_path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
                    >
                      Télécharger PDF
                    </a>
                  </div>
                </article>
              ))}
              </div>
              {pagination && <div className="mt-12">{pagination}</div>}
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
