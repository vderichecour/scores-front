import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/scores")({
  head: () => ({
    meta: [
      { title: "Partitions — Elias Vogel" },
      {
        name: "description",
        content:
          "Partitions choisies d'Elias Vogel, disponibles pour l'étude et le concert. Téléchargements PDF gratuits.",
      },
      { property: "og:title", content: "Partitions — Elias Vogel" },
      {
        property: "og:description",
        content:
          "Partitions publiées pour orgue et ensemble. Disponibles pour l'étude et le concert.",
      },
    ],
  }),
  component: ScoresPage,
});

const scores = [
  {
    no: "01",
    title: "Répons des Ténèbres",
    sub: "Pour orgue solo & contre-ténor",
    year: "2022",
    duration: "14′ 20″",
    file: "/scores/tenebrae-responsories.pdf",
  },
  {
    no: "02",
    title: "Courbes Caténaires",
    sub: "Poème symphonique pour grand orgue",
    year: "2019",
    duration: "28′ 00″",
    file: "/scores/catenary-curves.pdf",
  },
  {
    no: "03",
    title: "Variations Vespérales",
    sub: "Ensemble d'orgue de chambre",
    year: "2023",
    duration: "09′ 45″",
    file: "/scores/vesper-variations.pdf",
  },
  {
    no: "04",
    title: "Trois Études sur le Plain-chant",
    sub: "Orgue solo — claviers seuls",
    year: "2021",
    duration: "11′ 10″",
    file: "/scores/three-plainchant-studies.pdf",
  },
  {
    no: "05",
    title: "Liturgie des Arbres",
    sub: "Chœur de chambre & orgue",
    year: "2020",
    duration: "08′ 30″",
    file: "/scores/liturgy-of-the-trees.pdf",
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
            Partitions <span className="italic font-normal">publiées</span>.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-80">
            Un catalogue vivant d'œuvres disponibles pour l'étude et le
            concert. Les partitions sont fournies au format PDF ; merci de
            mentionner l'auteur sur tous les programmes.
          </p>
        </header>

        <section className="animate-reveal [animation-delay:200ms]">
          <div className="flex items-baseline justify-between mb-8 border-b-2 border-foreground pb-4">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Partitions choisies
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
                  <p className="text-sm italic opacity-60">{s.sub}</p>
                </div>
                <div className="col-span-6 md:col-span-2 font-mono text-sm">
                  {s.year}
                </div>
                <div className="col-span-6 md:col-span-2 font-mono text-sm tracking-tighter opacity-70">
                  {s.duration}
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
