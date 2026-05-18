import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Clément Portal" },
      {
        name: "description",
        content:
          "Contactez Clément Portal pour toute question concernant les partitions harmonisées ou composées.",
      },
      { property: "og:title", content: "Contact — Clément Portal" },
      {
        property: "og:description",
        content: "Pour toute question concernant les partitions.",
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
            Écrire <span className="italic font-normal">directement</span>.
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-reveal [animation-delay:200ms]">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Adresse électronique
              </p>
              <a
                href="mailto:clement.portal@gmail.com"
                className="font-display text-3xl md:text-4xl underline decoration-accent decoration-2 underline-offset-8 hover:text-accent transition-colors break-all"
              >
                clement.portal@gmail.com
              </a>
            </div>
          </div>

          <aside className="lg:col-span-5 border-l-0 lg:border-l lg:pl-12 border-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
              Note
            </p>
            <p className="text-lg leading-relaxed opacity-85">
              Pour toute question sur une partition, une demande
              d'harmonisation ou simplement un retour d'expérience après
              avoir joué l'une de ces pièces — n'hésitez pas à écrire.
            </p>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
