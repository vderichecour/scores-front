import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/biography")({
  head: () => ({
    meta: [
      { title: "Biographie — Clément Portal" },
      {
        name: "description",
        content:
          "Clément Portal, organiste : parcours, formation, harmonisations et compositions pour orgue.",
      },
      { property: "og:title", content: "Biographie — Clément Portal" },
      {
        property: "og:description",
        content: "Organiste, harmonisateur et compositeur.",
      },
    ],
  }),
  component: BiographyPage,
});

function BiographyPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <header className="mb-16 md:mb-24 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Biographie
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance max-w-4xl">
            Un organiste <span className="italic font-normal">au service</span> du chant.
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 animate-reveal">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Instrument
              </p>
              <p className="font-display text-xl italic">Orgue</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-4">
                Activité
              </p>
              <p className="font-display text-xl italic">
                Harmonisations &amp; compositions
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 max-w-2xl space-y-6 text-lg leading-relaxed">
            <p className="font-display text-2xl md:text-3xl leading-snug">
              Clément Portal est organiste. Il consacre une part essentielle
              de son travail à l'harmonisation de cantiques et à la
              composition de pièces pour orgue.
            </p>
            <p className="opacity-85">
              Au fil des années passées à la console, il a rassemblé un
              ensemble de partitions destinées à l'accompagnement liturgique
              comme à la méditation. Ces partitions, présentées dans le
              catalogue de ce site, sont librement mises à disposition.
            </p>
            <p className="opacity-85">
              Son approche cherche à préserver la simplicité mélodique des
              chants tout en proposant des harmonisations sobres et chantables
              pour l'assemblée comme pour les chœurs.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
