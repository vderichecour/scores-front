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
          "Clément Portal, organiste et compositeur : son parcours et sa démarche au service de la liturgie.",
      },
      { property: "og:title", content: "Biographie — Clément Portal" },
      {
        property: "og:description",
        content: "Clément Portal, organiste et compositeur : son parcours et sa démarche au service de la liturgie.",
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
        <section className="mb-16 md:mb-20">
          <header className="animate-reveal">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
              Biographie
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance">
              Clément Portal, organiste et compositeur.
            </h1>
          </header>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 animate-reveal">
          <figure className="lg:col-span-4 lg:sticky lg:top-32 self-start animate-reveal [animation-delay:200ms]">
            <img
              src={clementChurch}
              alt="Clément Portal dans l'église de Saint-Merry"
              width={1024}
              height={1024}
              className="w-full aspect-[4/5] object-cover object-[28%_center] rounded-sm border border-border"
            />
            <figcaption className="mt-2 text-xs opacity-50 text-right italic">
              Photo : Caroline Dauger
            </figcaption>
          </figure>
          <div className="lg:col-span-8 max-w-2xl space-y-6 text-lg leading-relaxed">
            <p className="opacity-85">
              Clément Portal a étudié l'orgue et l'écriture au conservatoire de Paris avec entre autres Frédéric Denis et Stéphane Delplace.
              Il a servi dans plusieurs paroisses parisiennes (Saint-Roch, Saint-Sulpice, Notre-Dame-des-Blancs-Manteaux...) avant de devenir organiste titulaire à Saint-Merry.
              Résidant actuellement à Orléans, il officie régulièrement à la cathédrale et dans d'autres églises du cœur de ville.
            </p>
            <p className="opacity-85">
             Il a aussi étudié le chant grégorien auprès de l’École du Chœur grégorien de Paris
              et a chanté plusieurs années à la schola de la paroisse Saint-Roch de Paris.
              Il vient d’être nommé lauréat du concours de composition organisé par Canticum Fidei
              et verra donc trois de ses compositions enregistrées dans le prochain album de l’association.
            </p>
          </div>
        </section>

        <section className="mt-16 md:mt-20 animate-reveal text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-display text-2xl md:text-3xl leading-snug mb-4 italic">
              « Il est tout à fait souhaitable que les organistes ne soient pas seulement experts dans le jeu de l'instrument qui leur est confié ;
                  mais ils doivent connaître et pénétrer intimement l'esprit de la liturgie pour qu'en exerçant leur fonction, même dans l'improvisation,
                  ils enrichissent la célébration selon la vraie nature de chacun de ses éléments, et favorisent la participation des fidèles. »
            </p>
            <p className="text-sm font-mono uppercase tracking-widest opacity-60">
              Instruction Musicam Sacram, § 67
            </p>
          </div>
        </section>

        <section className="mt-16 md:mt-20 pt-12 md:pt-16 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-10 md:mb-12">
            Ma démarche
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed">
              <p className="opacity-85">
                Comme de nombreux musiciens d’Église, j'ai souvent souhaité disposer de partitions offrant une harmonie irréprochable, une prosodie soignée et une présentation éditoriale de qualité.
                Cette conviction m’a conduit à entreprendre un travail de longue haleine : rééditer progressivement d’anciens cantiques tombés dans l’oubli, améliorer l’harmonisation des chants qui le méritaient, et composer des œuvres originales.
              </p>
              <p className="opacity-85">
                Depuis plusieurs années, ces partitions sont chantées à la paroisse Saint-Roch de Paris.
                Désireux d’en faire profiter un public plus large, j’ai décidé de les mettre à disposition sur ce site.
                Mon ambition est de constituer un répertoire de chants, connus ou à découvrir, offrant le même souci d’exigence dans les textes, la musique et la présentation.
              </p>
              <p className="opacity-85">
                Dans l’harmonisation comme dans la composition des cantiques, j’ai recherché une noble simplicité.
                L’objectif est de favoriser la participation de l’assemblée, sans la dérouter par des effets inutiles.
                Toutes les partitions sont écrites à quatre voix, de manière à pouvoir être chanté par un chœur comme par un chantre accompagné à l’orgue.
              </p>
              <p className="opacity-85">
                Le site propose également des motets, toujours concis et accessibles, qui peuvent ainsi enrichir rapidement le répertoire musical de nombreuses paroisses.
                Leur variété de textes permet d’accompagner l’ensemble de l’année liturgique, chaque temps disposant de pièces adaptées.
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
              <figcaption className="mt-2 text-xs opacity-50 text-right italic">
                Photo : Caroline Dauger
              </figcaption>
            </figure>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
