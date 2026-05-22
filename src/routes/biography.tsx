import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import clementChurch from "@/assets/clement-church.jpg";

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
            Un musicien au service de la liturgie.
          </h1>
        </header>

        <figure className="mb-12 md:mb-16 animate-reveal">
          <img
            src={clementChurch}
            alt="Clément Portal dans l'église de Saint-Merry"
            width={1024}
            height={1024}
            className="w-full h-auto rounded-sm border border-border"
          />
        </figure>

        <section className="space-y-6 text-lg leading-relaxed animate-reveal">
          <p className="font-display text-2xl md:text-3xl leading-snug">
            Clément Portal est organiste et compositeur.
            Il consacre une part importante
            de son travail à la composition, l'harmonisation et l'édition de pièces liturgiques.
          </p>
          <p className="opacity-85">
            Il a étudié l'orgue et l'écriture au conservatoire de Paris avec Frédéric Denis et Stéphane Delplace.
            Il a ensuite servi dans de nombreuses paroisses parisiennes en tant que chanteur ou organiste (Saint-Roch, Saint-Germain-des-Prés, Notre-Dame-des-blancs-manteaux...) avant de devenir organiste titulaire à Saint-Merry.
            Cette expérience lui a permis de repérer un problème dans le répertoire liturgique actuel : beaucoup de chants de piètre qualité circulent en ligne, mais rares sont les chants à être bien écrits, bien harmonisés et bien édités.
            Après avoir harmonisé, édité et composé de nombreuses pièces pour des usages privés, il décide donc de les rendre disponibles au plus grand nombre.
          </p>
          <p className="opacity-85">
            Il cherche à ce que ces pièces, cantiques ou motets,
            soient aisées à apprendre pour un chœur amateur disposant de peu de temps de répétition,
            fassent preuve d'une beauté solennelle qui convienne au cadre liturgique
            et respectent toutes les règles de l'art de l'harmonie et de l'édition musicale.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
