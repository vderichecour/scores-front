import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/scores")({
  head: () => ({
    meta: [
      { title: "Partitions — Clément Portal" },
      {
        name: "description",
        content:
          "Catalogue de partitions éditées par Clément Portal, librement téléchargeables au format PDF.",
      },
      { property: "og:title", content: "Partitions — Clément Portal" },
      {
        property: "og:description",
        content:
          "Partitions pour orgue : harmonisations et compositions originales.",
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
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

function pdfUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/scores/${path}`;
}

const ALL = "__all__";

function ScoresPage() {
  const [scores, setScores] = useState<Score[] | null>(null);
  const [composer, setComposer] = useState<string>(ALL);
  const [author, setAuthor] = useState<string>(ALL);
  const [label, setLabel] = useState<string>(ALL);

  useEffect(() => {
    supabase
      .from("scores")
      .select("id,title,author,composer,pdf_path,labels")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
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
    return scores.filter((s) => {
      if (composer !== ALL && s.composer !== composer) return false;
      if (author !== ALL && (s.author ?? "") !== author) return false;
      if (label !== ALL && !(s.labels ?? []).includes(label)) return false;
      return true;
    });
  }, [scores, composer, author, label]);

  const resetFilters = () => {
    setComposer(ALL);
    setAuthor(ALL);
    setLabel(ALL);
  };
  const hasActiveFilter = composer !== ALL || author !== ALL || label !== ALL;

  const selectClass =
    "w-full border border-foreground bg-transparent px-3 py-2 text-sm font-mono";

  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <header className="mb-16 md:mb-20 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Catalogue
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance max-w-4xl mb-6">
            Partitions <span className="italic font-normal">harmonisées</span> &amp; composées.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-80">
            Catalogue de partitions éditées par Clément Portal, mises à disposition pour le contexte liturgique.
            Merci de me prévenir pour tout autre usage.
          </p>
        </header>

        <section className="animate-reveal [animation-delay:200ms]">
          <div className="flex items-baseline justify-between mb-8 border-b-2 border-foreground pb-4">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Catalogue
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:block">
              Pour la liturgie et les concerts spirituels
            </span>
          </div>

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
            <div className="divide-y divide-border">
              {filtered!.map((s, i) => (
                <article
                  key={s.id}
                  className="group grid grid-cols-12 py-6 md:py-8 items-baseline md:items-center gap-y-3 gap-x-4 hover:bg-accent/[0.03] transition-colors px-2 -mx-2 md:px-4 md:-mx-4"
                >
                  <div className="col-span-2 md:col-span-1 font-mono text-sm opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-10 md:col-span-5">
                    <h3 className="text-xl md:text-2xl font-display font-semibold group-hover:text-accent transition-colors">
                      {s.title}
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
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
