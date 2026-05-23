import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import clementOrgan from "@/assets/clement-organ.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clément Portal — Organiste & Partitions" },
      {
        name: "description",
        content:
          "Clément Portal, organiste. Partitions harmonisées et composées, librement disponibles au téléchargement.",
      },
      { property: "og:title", content: "Clément Portal — Organiste & Partitions" },
      {
        property: "og:description",
        content:
          "Partitions harmonisées et composées par Clément Portal, organiste.",
      },
    ],
  }),
  component: HomePage,
});

type RecentScore = {
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

function HomePage() {
  const [recents, setRecents] = useState<RecentScore[] | null>(null);

  useEffect(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const isoDate = sevenDaysAgo.toISOString();

    supabase
      .from("scores")
      .select("id,title,author,composer,pdf_path,labels,created_at")
      .gte("created_at", isoDate)
      .order("created_at", { ascending: false })
      .then(({ data }) => setRecents((data as RecentScore[] | null) ?? []));
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16 items-center">
          <div className="lg:col-span-7 animate-reveal [animation-delay:200ms]">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black mb-8 leading-[0.9] text-balance">
              Harmoniser, composer, partager.
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-[34ch] text-pretty opacity-90">
              Je rassemble ici mes harmonisations et compositions
              pour chœur, librement mises à disposition.
            </p>
            <div className="mt-10">
              <Link
                to="/scores"
                className="inline-block px-6 py-3 border border-foreground text-xs font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
              >
                Voir les partitions
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 animate-reveal [animation-delay:400ms]">
            <figure>
              <img
                src={clementOrgan}
                alt="Clément Portal à l'orgue de tribune de Saint-Merry"
                width={800}
                height={1024}
                className="w-full aspect-[4/5] object-cover rounded-sm border border-border"
              />
            </figure>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-24 md:mb-32 animate-reveal">
          <p className="font-display text-2xl md:text-3xl leading-snug mb-8 italic">
            « La tradition musicale de l’Église universelle constitue un trésor d’une valeur inestimable
            qui l’emporte sur les autres arts. »
          </p>
          <p className="text-lg leading-relaxed opacity-80">
            Au fil des années, j'ai harmonisé des cantiques anciens
            et composé de nombreuses pièces pour la liturgie.
            Ce site rassemble ces partitions, librement téléchargeables,
            pour qu'elles puissent servir à d'autres organistes, chœurs et paroisses.
          </p>
        </section>

        {/* Récents */}
        <section className="border-t-2 border-foreground pt-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Récents
            </h2>
            <Link
              to="/scores"
              className="font-mono text-[10px] uppercase tracking-widest hover:text-accent transition-colors"
            >
              Tout le catalogue →
            </Link>
          </div>
          {recents === null ? (
            <p className="py-12 text-sm font-mono opacity-60">Chargement…</p>
          ) : recents.length === 0 ? (
            <p className="py-12 text-sm opacity-60">
              Aucune partition récemment ajoutée.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recents.map((s) => (
                <article
                  key={s.id}
                  className="group grid grid-cols-12 py-6 md:py-8 items-baseline md:items-center gap-y-3 gap-x-4 hover:bg-accent/[0.03] transition-colors px-2 -mx-2 md:px-4 md:-mx-4"
                >
                  <div className="col-span-3 md:col-span-1 font-mono text-[11px] md:text-xs opacity-40 whitespace-nowrap">
                    {formatDate(s.created_at)}
                  </div>
                  <div className="col-span-9 md:col-span-5">
                    <h3 className="text-xl md:text-2xl font-display font-semibold group-hover:text-accent transition-colors">
                      {s.title}
                    </h3>
                    {s.author && (
                      <p className="text-sm italic opacity-60">{s.author}</p>
                    )}
                    {s.labels && s.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {s.labels.map((l) => (
                          <span
                            key={l}
                            className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-foreground/30"
                          >
                            {l}
                          </span>
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
