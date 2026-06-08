import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import clementChurch from "@/assets/clement-church.jpg";
import clementPortal4 from "@/assets/clement-portal-4.jpg";

export const Route = createFileRoute("/biography")({
  head: () => ({
    meta: [
      { title: "Biographie — Clément Portal" },
      {
        name: "description",
        content:
          "Clément Portal, organiste et compositeur : parcours, formation, harmonisations et compositions.",
      },
      { property: "og:title", content: "Biographie — Clément Portal" },
      {
        property: "og:description",
        content: "Organiste et compositeur.",
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

        <figure className="mb-12 md:mb-16 animate-reveal max-w-md md:max-w-lg mx-auto">
          <img
            src={clementChurch}
            alt="Clément Portal dans l'église de Saint-Merry"
            width={1024}
            height={1024}
            className="w-full h-auto rounded-sm border border-border"
          />
        </figure>

        
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 animate-reveal">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Date de naissance
              </p>
              <p className="font-display text-xl italic">19 mars 1999</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-4">
                Lieu de résidence
              </p>
              <p className="font-display text-xl italic">
                Orléans
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 max-w-2xl space-y-6 text-lg leading-relaxed">
            <p className="font-display text-2xl md:text-3xl leading-snug">
              Clément Portal est organiste et compositeur.
            </p>
            <p className="opacity-85">
              Il a étudié l'orgue et l'écriture au conservatoire de Paris avec entre autres Frédéric Denis et Stéphane Delplace.
              Il a servi dans plusieurs paroisses parisiennes (Saint-Roch, Saint-Sulpice, Notre-Dame-des-Blancs-Manteaux...) avant de devenir organiste titulaire à Saint-Merry.
              Résidant actuellement à Orléans, il accompagne la messe dominicale à l’église Notre-Dame-de-Recouvrance et remplace ponctuellement à la cathédrale.
            </p>
            <p className="opacity-85">
             Il a aussi étudié le chant grégorien auprès de l’Ecole du Chœur grégorien de Paris
              et a chanté plusieurs années à la schola de la paroisse Saint-Roch de Paris.
              Il vient d’être nommé lauréat du concours de composition organisé par Canticum Fidei
              et verra donc trois de ses compositions enregistrées dans le prochain album de l’association.
            </p>
          </div>
        </section>

        <section className="mb-24 md:mb-32 animate-reveal">
          <p className="font-display text-2xl md:text-3xl leading-snug mb-8 italic">
            « Il est tout à fait souhaitable que les organistes ne soient pas seulement experts dans le jeu de l'instrument qui leur est confié ;
                mais ils doivent connaître et pénétrer intimement l'esprit de la liturgie pour qu'en exerçant leur fonction, même dans l'improvisation,
                ils enrichissent la célébration selon la vraie nature de chacun de ses éléments, et favorisent la participation des fidèles. »
          </p>
        </section>
        
        <section className="mt-24 md:mt-32 border-t border-border pt-16 md:pt-24 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-10 md:mb-12">
            Ma démarche
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed">
              <p className="opacity-85">
                Comme de nombreux musiciens d’Église, j’ai souvent souhaité disposer de partitions offrant une plus grande cohérence musicale, une prosodie plus soignée et une présentation éditoriale de meilleure qualité.
                Cette conviction m’a conduit à entreprendre un travail de longue haleine : rééditer progressivement d’anciens cantiques tombés dans l’oubli, enrichir l’harmonisation de chants de valeur qui méritaient une nouvelle mise en lumière, et composer également des œuvres originales.
              </p>
              <p className="opacity-85">
                Depuis plusieurs années, ces partitions sont chantées à la paroisse Saint-Roch de Paris.
                Désireux d’en faire profiter un public plus large, j’ai décidé de les mettre à disposition sur ce site.
                Mon ambition est de constituer un répertoire de chants, connus ou à découvrir, offrant le même souci d’exigence dans les textes, la musique et la présentation.
              </p>
              <p className="opacity-85">
                Dans l’harmonisation comme dans la composition des cantiques populaires, j’ai recherché une noble simplicité.
                L’objectif est de favoriser la participation de l’assemblée, sans la dérouter par des effets inutiles, tout en permettant aux chœurs de préparer les œuvres avec un temps de répétition raisonnable.
                Toutes les partitions sont écrites à quatre voix, mais elles peuvent naturellement être interprétées par un chantre accompagné à l’orgue.
              </p>
              <p className="opacity-85">
                Le site propose également des motets, toujours concis et accessibles à des chorales amateurs.
                Leur variété de textes permet d’accompagner l’ensemble de l’année liturgique, chaque temps disposant de pièces adaptées.
                Ils peuvent ainsi enrichir rapidement le répertoire musical de nombreuses paroisses.
              </p>
              <p className="opacity-85">
                J’espère que ce travail contribuera, à sa mesure, à servir « la gloire de Dieu et la sanctification des fidèles ».
              </p>
            </div>
            <figure className="lg:col-span-5">
              <img
                src={clementPortal4}
                alt="Mains de Clément Portal sur les claviers du grand orgue de Saint-Merry"
                width={800}
                height={1200}
                className="w-full h-auto rounded-sm border border-border"
              />
            </figure>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
