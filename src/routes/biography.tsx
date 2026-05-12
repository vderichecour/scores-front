import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/biography")({
  head: () => ({
    meta: [
      { title: "Biographie — Elias Vogel" },
      {
        name: "description",
        content:
          "Biographie d'Elias Vogel, organiste concertiste et compositeur établi à Cologne. Formation, résidences et enregistrements.",
      },
      { property: "og:title", content: "Biographie — Elias Vogel" },
      {
        property: "og:description",
        content:
          "Une voix sculptée par l'espace, la pierre et le souffle.",
      },
    ],
  }),
  component: BiographyPage,
});

const timeline = [
  { year: "1984", text: "Naissance à Bruxelles dans une famille de musiciens liturgiques." },
  { year: "2006", text: "Premier Prix, Conservatoire de Paris (orgue, composition)." },
  { year: "2010", text: "Nommé organiste titulaire de l'Abbaye de Saint-Germain." },
  { year: "2016", text: "Premier enregistrement pour le label Archiv, « Pierre & Air »." },
  { year: "2021", text: "Compositeur en résidence, Kölner Philharmonie." },
  { year: "2024", text: "Tournée : Westminster, Notre-Dame, Berliner Philharmonie." },
];

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
            Une voix <span className="italic font-normal">sculptée</span> par l'espace.
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-24 animate-reveal">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Né à</p>
              <p className="font-display text-xl italic">Bruxelles, 1984</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-4">Réside à</p>
              <p className="font-display text-xl italic">Cologne, Allemagne</p>
            </div>
          </div>
          <div className="lg:col-span-8 max-w-2xl space-y-6 text-lg leading-relaxed">
            <p className="font-display text-2xl md:text-3xl leading-snug">
              L'œuvre d'Elias Vogel se distingue par un « silence profond entre
              les accords », philosophie née d'une décennie passée comme
              organiste titulaire de l'Abbaye de Saint-Germain.
            </p>
            <p className="opacity-85">
              Ses compositions pour grand orgue jettent un pont entre le
              monumentalisme de l'école romantique française et l'austérité
              texturale du modernisme. Ses enregistrements pour le label{" "}
              <em>Archiv</em> ont été salués pour leur clarté rythmique et
              leur sens de l'espace.
            </p>
            <p className="opacity-85">
              Établi aujourd'hui à Cologne, Vogel continue de commander des
              œuvres nouvelles qui repoussent les limites mécaniques de
              l'orgue à traction directe, cherchant le souffle humain au cœur
              de la machine. Il s'est produit à l'Abbaye de Westminster, à
              Notre-Dame de Paris et à la Berliner Philharmonie.
            </p>
          </div>
        </section>

        <section className="border-t-2 border-foreground pt-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Chronologie choisie
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              MCMLXXXIV —
            </span>
          </div>
          <div className="divide-y divide-border">
            {timeline.map((t) => (
              <div
                key={t.year}
                className="grid grid-cols-12 py-6 items-baseline gap-4"
              >
                <div className="col-span-3 md:col-span-2 font-mono text-sm text-accent">
                  {t.year}
                </div>
                <p className="col-span-9 md:col-span-10 text-lg md:text-xl font-display">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
