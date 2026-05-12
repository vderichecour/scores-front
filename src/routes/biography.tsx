import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/biography")({
  head: () => ({
    meta: [
      { title: "Biography — Elias Vogel" },
      {
        name: "description",
        content:
          "Biography of Elias Vogel, concert organist and composer based in Cologne. Education, residencies, and recorded works.",
      },
      { property: "og:title", content: "Biography — Elias Vogel" },
      {
        property: "og:description",
        content:
          "A life shaped by stone, wind, and the silence between chords.",
      },
    ],
  }),
  component: BiographyPage,
});

const timeline = [
  { year: "1984", text: "Born in Brussels into a family of liturgical musicians." },
  { year: "2006", text: "Premier Prix, Conservatoire de Paris (organ, composition)." },
  { year: "2010", text: "Appointed titular organist, Abbey of Saint-Germain." },
  { year: "2016", text: "Debut recording for the Archiv label, 'Stone & Air'." },
  { year: "2021", text: "Composer-in-residence, Kölner Philharmonie." },
  { year: "2024", text: "Tour: Westminster, Notre-Dame, Berliner Philharmonie." },
];

function BiographyPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <header className="mb-16 md:mb-24 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Biography
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance max-w-4xl">
            A voice <span className="italic font-normal">sculpted</span> by space.
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-24 animate-reveal">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Born</p>
              <p className="font-display text-xl italic">Brussels, 1984</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-4">Resides</p>
              <p className="font-display text-xl italic">Cologne, Germany</p>
            </div>
          </div>
          <div className="lg:col-span-8 max-w-2xl space-y-6 text-lg leading-relaxed">
            <p className="font-display text-2xl md:text-3xl leading-snug">
              Elias Vogel's work is characterized by a "profound silence between
              the chords," a philosophy garnered from a decade spent as the
              titular organist at the Abbey of Saint-Germain.
            </p>
            <p className="opacity-85">
              His compositions for the pipe organ bridge the gap between the
              monumentalism of the French Romantic school and the textural
              austerity of modernism. His recordings for the <em>Archiv</em>{" "}
              label have been cited for their rhythmic clarity and spatial
              awareness.
            </p>
            <p className="opacity-85">
              Currently residing in Cologne, Vogel continues to commission new
              works that push the mechanical limits of the tracker action
              organ, seeking the human breath within the machine. He has
              performed at Westminster Abbey, Notre-Dame de Paris, and the
              Berliner Philharmonie.
            </p>
          </div>
        </section>

        <section className="border-t-2 border-foreground pt-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Selected Chronology
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
