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
              Vivant actuellement à Orléans, il accompagne la messe dominicale à l’église Notre-Dame-de-Recouvrance et remplace ponctuellement à la cathédrale.
            </p>
            <p className="opacity-85">
             Il a aussi étudié le chant grégorien auprès de l’Ecole du Chœur grégorien de Paris
              et a été plusieurs années chanteur à la schola de la paroisse Saint-Roch de Paris.
              Il vient d’être nommé lauréat du concours de composition organisé par Canticum Fidei
              et verra donc trois de ses compositions enregistrées dans le prochain album de l’association.
            </p>
          </div>
        </section>

        <section className="mt-24 md:mt-32 border-t border-border pt-16 md:pt-24 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-10 md:mb-12">
            Démarche
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed">
              <p className="font-display text-2xl md:text-3xl leading-snug italic">
                « Il est tout à fait souhaitable que les organistes ne soient pas seulement experts dans le jeu de l'instrument qui leur est confié ;
                mais ils doivent connaître et pénétrer intimement l'esprit de la liturgie pour qu'en exerçant leur fonction, même dans l'improvisation,
                ils enrichissent la célébration selon la vraie nature de chacun de ses éléments, et favorisent la participation des fidèles. »
              </p>
              <p className="opacity-85">
                Comme un grand nombre de musiciens d’Eglise, j’ai constaté de nombreux défauts dans les partitions chantées par la plupart des paroisses de France :
                harmonisations déficientes ne respectant pas les règles élémentaires de la musique, prosodies douteuses, éditions de piètre qualité, etc.
              </p>
              <p className="opacity-85">
                Plutôt que de m’en désoler, j’ai décidé de me mettre à l’ouvrage : j’ai d’une part progressivement réédité d’anciens cantiques tombés en désuétude,
                d’autre part réécrit les chants de bonne qualité méritant une meilleure harmonie et enfin composé des pièces originales.
                Ces nouvelles partitions sont en partie chantées depuis plusieurs années à la paroisse Saint-Roch de Paris où le chœur et l’assemblée sont très satisfaits de ce travail.
              </p>
              <p className="opacity-85">
                J’ai donc résolu de mettre le résultat des efforts fournis à la disposition du plus grand nombre en publiant ces partitions sur un site internet dédié.
                Mon objectif est ainsi de créer un répertoire de chants, déjà connus ou non, mais toujours irréprochables aux points de vue des paroles, de la musique et de la mise en page.
                De plus, des filtres permettront aux chefs de chœur de trouver rapidement les pièces qui pourraient convenir pour leur prochaine messe.
              </p>
              <p className="opacity-85">
                Mon objectif lors de l’harmonisation et la composition des cantiques populaires a été de garder une noble simplicité,
                de manière que l’assemblée ne soit pas découragée de chanter par des accords inattendus et que le chœur puisse maîtriser la partition avec peu de temps de répétition.
                Toutes les partitions sont à quatre voix, mais elles peuvent bien sûr être chantées par un chantre seul accompagné par un orgue.
              </p>
              <p className="opacity-85">
                Ce site contient aussi des motets, qui restent de même toujours brefs et aisés à apprendre par un chœur amateur.
                Ils font en revanche preuve d’une grande diversité dans leurs textes, chaque temps liturgique ayant ses motets correspondants.
                Ils pourront de la sorte rejoindre rapidement le répertoire d’un grand nombre de paroisses.
              </p>
              <p className="opacity-85">
                J’espère ainsi avoir œuvré à « la gloire de Dieu et la sanctification des fidèles » !
              </p>
            </div>
            <figure className="lg:col-span-5">
              <img
                src={clementPortal4}
                alt="Mains de Clément Portal sur les claviers d'un orgue"
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
