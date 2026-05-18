import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/scores")({
  head: () => ({
    meta: [
      { title: "Partitions — Clément Portal" },
      {
        name: "description",
        content:
          "Catalogue des partitions harmonisées et composées par Clément Portal, librement téléchargeables au format PDF.",
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
  no: string;
  title: string;
  author: string;
  composer: string;
  file: string;
};

const scores: Score[] = [
  {
    no: "01",
    title: "Répons des Ténèbres",
    author: "Liturgie du Triduum",
    composer: "Harmonisation : Clément Portal",
    file: "/scores/repons-des-tenebres.pdf",
  },
  {
    no: "02",
    title: "Veni Creator",
    author: "Raban Maur",
    composer: "Harmonisation : Clément Portal",
    file: "/scores/veni-creator.pdf",
  },
  {
    no: "03",
    title: "Prélude pour un matin clair",
    author: "—",
    composer: "Composition : Clément Portal",
    file: "/scores/prelude-matin-clair.pdf",
  },
  {
    no: "04",
    title: "Trois Études sur le Plain-chant",
    author: "Mélodies grégoriennes",
    composer: "Harmonisation : Clément Portal",
    file: "/scores/etudes-plain-chant.pdf",
  },
  {
    no: "05",
    title: "Méditation sur le Magnificat",
    author: "—",
    composer: "Composition : Clément Portal",
    file: "/scores/meditation-magnificat.pdf",
  },
];

function ScoresPage() {
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
            Recueil de partitions pour orgue, mises à disposition au format
            PDF. Merci de mentionner l'auteur du texte ainsi que
            l'harmonisateur ou le compositeur sur les programmes.
          </p>
        </header>

        <section className="animate-reveal [animation-delay:200ms]">
          <div className="flex items-baseline justify-between mb-8 border-b-2 border-foreground pb-4">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Catalogue
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:block">
              Pour l'étude &amp; le concert
            </span>
          </div>

          <div className="divide-y divide-border">
            {scores.map((s) => (
              <article
                key={s.no}
                className="group grid grid-cols-12 py-6 md:py-8 items-baseline md:items-center gap-y-3 gap-x-4 hover:bg-accent/[0.03] transition-colors px-2 -mx-2 md:px-4 md:-mx-4"
              >
                <div className="col-span-2 md:col-span-1 font-mono text-sm opacity-40">
                  {s.no}
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="text-xl md:text-2xl font-display font-semibold group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm italic opacity-60">{s.author}</p>
                </div>
                <div className="col-span-12 md:col-span-4 font-mono text-xs md:text-sm opacity-75">
                  {s.composer}
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <a
                    href={s.file}
                    className="inline-block px-4 py-2 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
                  >
                    Télécharger PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
