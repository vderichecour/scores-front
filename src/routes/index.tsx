import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import organPipes from "@/assets/organ-pipes.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elias Vogel — Organiste & Compositeur" },
      {
        name: "description",
        content:
          "Organiste concertiste et compositeur. La résonance de la pierre ancienne — œuvres choisies, biographie et partitions à télécharger.",
      },
      { property: "og:title", content: "Elias Vogel — Organiste & Compositeur" },
      {
        property: "og:description",
        content:
          "La résonance de la pierre ancienne. Organiste concertiste et compositeur établi à Cologne.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-24 md:mb-40 items-center">
          <div className="lg:col-span-7 animate-reveal [animation-delay:200ms]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
              Op. — Cologne, 2024
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black mb-8 leading-[0.9] text-balance">
              La résonance de la{" "}
              <span className="italic font-normal">pierre</span> ancienne.
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-[34ch] text-pretty opacity-90">
              Compositeur et organiste concertiste explorant la rencontre entre
              la tradition liturgique et les structures minimalistes
              contemporaines.
            </p>
          </div>
          <div className="lg:col-span-5 animate-reveal [animation-delay:400ms]">
            <figure>
              <img
                src={organPipes}
                alt="Grand orgue à tuyaux dans une cathédrale gothique faiblement éclairée"
                width={800}
                height={1024}
                className="w-full aspect-[4/5] object-cover rounded-sm border border-border"
              />
              <figcaption className="mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Fig. 01 — Saint-Sernin, orgue de tribune
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Bio teaser */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-24 md:mb-32 animate-reveal">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="font-mono text-xs uppercase tracking-tighter text-accent border-b border-accent/30 pb-1">
                The Artist
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-snug mb-8 italic">
              "A profound silence between the chords." — Le Monde de la Musique
            </p>
            <p className="text-lg leading-relaxed opacity-80">
              A decade as titular organist at the Abbey of Saint-Germain shaped
              a body of work that bridges French Romantic monumentalism and
              modern textural austerity. Recordings on the Archiv label have
              been cited for their rhythmic clarity and spatial awareness.
            </p>
          </div>
        </section>

        {/* Recent works strip */}
        <section className="border-t-2 border-foreground pt-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Recent
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              MMXXII — MMXXIV
            </span>
          </div>
          <div className="divide-y divide-border">
            {[
              {
                no: "01",
                title: "Tenebrae Responsories",
                meta: "Solo organ & countertenor",
                year: "2022",
              },
              {
                no: "02",
                title: "Catenary Curves",
                meta: "Symphonic poem for grand organ",
                year: "2019",
              },
              {
                no: "03",
                title: "Vesper Variations",
                meta: "Chamber organ ensemble",
                year: "2023",
              },
            ].map((w) => (
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
                  <p className="text-sm italic opacity-60">{w.meta}</p>
                </div>
                <div className="col-span-12 sm:col-span-4 sm:text-right font-mono text-sm">
                  {w.year}
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
