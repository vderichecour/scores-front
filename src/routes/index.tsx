import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import organPipes from "@/assets/organ-pipes.jpg";

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

const recent = [
  {
    no: "01",
    title: "Répons des Ténèbres",
    author: "Texte : liturgie du Triduum",
    composer: "Harmonisation : Clément Portal",
  },
  {
    no: "02",
    title: "Veni Creator",
    author: "Texte : Raban Maur",
    composer: "Harmonisation : Clément Portal",
  },
  {
    no: "03",
    title: "Prélude pour un matin clair",
    author: "—",
    composer: "Composition : Clément Portal",
  },
];

function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-24 md:mb-40 items-center">
          <div className="lg:col-span-7 animate-reveal [animation-delay:200ms]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
              Partitions — Orgue
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black mb-8 leading-[0.9] text-balance">
              Harmoniser, <span className="italic font-normal">composer</span>, partager.
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-[34ch] text-pretty opacity-90">
              Organiste, je rassemble ici mes harmonisations et compositions
              pour orgue, librement mises à disposition.
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
                src={organPipes}
                alt="Tuyaux d'orgue dans une église"
                width={800}
                height={1024}
                className="w-full aspect-[4/5] object-cover rounded-sm border border-border"
              />
              <figcaption className="mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Fig. 01 — Orgue de tribune
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-24 md:mb-32 animate-reveal">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="font-mono text-xs uppercase tracking-tighter text-accent border-b border-accent/30 pb-1">
                Démarche
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-snug mb-8 italic">
              « Une partition est faite pour être jouée. »
            </p>
            <p className="text-lg leading-relaxed opacity-80">
              Au fil des années passées à la console, j'ai harmonisé des
              cantiques anciens et composé quelques pièces pour
              l'accompagnement liturgique ou la méditation. Ce site rassemble
              ces partitions, librement téléchargeables, pour qu'elles
              puissent servir à d'autres organistes, chœurs et paroisses.
            </p>
          </div>
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
          <div className="divide-y divide-border">
            {recent.map((w) => (
              <div
                key={w.no}
                className="grid grid-cols-12 py-5 items-baseline gap-4"
              >
                <div className="col-span-2 sm:col-span-1 font-mono text-sm opacity-40">
                  {w.no}
                </div>
                <div className="col-span-10 sm:col-span-7">
                  <h3 className="text-xl md:text-2xl font-display font-semibold">
                    {w.title}
                  </h3>
                  <p className="text-sm italic opacity-60">{w.author}</p>
                </div>
                <div className="col-span-12 sm:col-span-4 sm:text-right font-mono text-xs opacity-70">
                  {w.composer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
