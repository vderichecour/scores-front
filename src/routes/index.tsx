import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScoreListItemRow } from "@/components/ScoreListItem";
import { SCORE_LIST_SELECT, type ScoreListItem } from "@/lib/scores";
import clementOrgan from "@/assets/clement-organ.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clément Portal — Partitions liturgiques" },
      {
        name: "description",
        content:
          "Catalogue de partitions liturgiques mises à disposition par Clément Portal, organiste et compositeur.",
      },
      { property: "og:title", content: "Clément Portal — Partitions liturgiques" },
      {
        property: "og:description",
        content:
          "Catalogue de partitions liturgiques mises à disposition par Clément Portal, organiste et compositeur.",
      },
    ],
  }),
  component: HomePage,
});

type RecentScore = ScoreListItem;

function HomePage() {
  const [recents, setRecents] = useState<RecentScore[] | null>(null);

  useEffect(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const isoDate = sevenDaysAgo.toISOString();

    supabase
      .from("scores")
      .select(SCORE_LIST_SELECT)
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
            <p className="text-xl md:text-2xl leading-relaxed max-w-[40ch] text-pretty opacity-90">
              Je mets à votre disposition un catalogue de partitions liturgiques de qualité, accessible librement.
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
              <figcaption className="mt-2 text-xs opacity-50 text-right italic">
                Photo : Caroline Dauger
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-24 md:mb-32 animate-reveal">
          <p className="font-display text-2xl md:text-3xl leading-snug mb-4 italic">
            « La tradition musicale de l'Église universelle constitue un trésor d'une valeur inestimable
            qui l'emporte sur les autres arts. »
          </p>
          <p className="text-sm font-mono uppercase tracking-widest opacity-60">
            Constitution Sacrosanctum Concilium, § 112
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
                <ScoreListItemRow key={s.id} score={s} />
              ))}
            </div>

          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
