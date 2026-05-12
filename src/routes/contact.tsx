import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elias Vogel" },
      {
        name: "description",
        content:
          "Contactez Elias Vogel pour des concerts, des commandes et des programmes de récital.",
      },
      { property: "og:title", content: "Contact — Elias Vogel" },
      {
        property: "og:description",
        content: "Pour les commandes, les récitals et la correspondance.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <header className="mb-16 md:mb-20 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Correspondance
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance max-w-4xl">
            Pour commandes <span className="italic font-normal">&amp;</span> récitals.
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-reveal [animation-delay:200ms]">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Studio
              </p>
              <a
                href="mailto:studio@eliasvogel.com"
                className="font-display text-3xl md:text-4xl underline decoration-accent decoration-2 underline-offset-8 hover:text-accent transition-colors"
              >
                studio@eliasvogel.com
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Agent — Europe
              </p>
              <p className="font-display text-2xl">
                M. Halbreich, <em>Konzertdirektion Köln</em>
              </p>
              <a
                href="mailto:bookings@konzertdirektion-koeln.de"
                className="font-mono text-sm hover:text-accent transition-colors"
              >
                bookings@konzertdirektion-koeln.de
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Presse
              </p>
              <a
                href="mailto:press@eliasvogel.com"
                className="font-display text-2xl hover:text-accent transition-colors"
              >
                press@eliasvogel.com
              </a>
            </div>
          </div>

          <aside className="lg:col-span-5 border-l-0 lg:border-l lg:pl-12 border-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
              Note
            </p>
            <p className="text-lg leading-relaxed opacity-85">
              Les demandes de commande doivent préciser l'effectif souhaité,
              la date de création et le lieu. Les programmes de récital sont
              confirmés dix-huit mois à l'avance. Réponse sous dix jours
              ouvrés.
            </p>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
