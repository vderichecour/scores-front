import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Ressources — Clément Portal" },
      {
        name: "description",
        content:
          "Documents et ressources essentiels pour la musique liturgique : textes de l'Église, répertoires de référence et ouvrages fondamentaux.",
      },
      { property: "og:title", content: "Ressources — Clément Portal" },
      {
        property: "og:description",
        content:
          "Documents et ressources pour la musique liturgique.",
      },
    ],
  }),
  component: ResourcesPage,
});

type ResourceItem = {
  title: string;
  description: string;
  url: string;
};

const magisterialDocuments: ResourceItem[] = [
  {
    title: "Sacrosanctum Concilium",
    description: "Constitution sur la sainte Liturgie (Concile Vatican II, 1963).",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_fr.html",
  },
  {
    title: "Présentation générale du Missel romain",
    description: "Instruction sur la mise en place du Missel romain révisé (2003).",
    url: "https://www.vatican.va/roman_curia/congregations/ccdds/documents/rc_con_ccdds_doc_20030317_ordinamento-messale_fr.html",
  },
  {
    title: "Musicam Sacram",
    description: "Instruction sur la musique dans la liturgie (1967).",
    url: "https://www.ceremoniaire.net/pastorale1950/docs/musicam_sacram_1967.html",
  },
  {
    title: "Inter pastoralis officii sollicitudines",
    description: "Motu proprio de saint Pie X sur la musique sacrée (1903).",
    url: "https://www.unavoce.fr/wp-content/uploads/Musique-sacree-magistere-1903-Tra-le-sollecitudini.pdf",
  },
];

const digitalResources: ResourceItem[] = [
  {
    title: "GregoBase",
    description: "Base de données collaborative de partitions grégoriennes.",
    url: "https://gregobase.selapa.net/",
  },
  {
    title: "CPDL",
    description: "Choral Public Domain Library — partitions de domaine public.",
    url: "https://www.cpdl.org/wiki/index.php/Main_Page/fr",
  },
  {
    title: "Chantons en Église",
    description: "Ressources et partitions pour le chant liturgique.",
    url: "https://www.chantonseneglise.fr/",
  },
  {
    title: "Liturgie et Sacrements",
    description: "Site officiel de la liturgie catholique en France.",
    url: "https://liturgie.catholique.fr/",
  },
];

function ResourceCard({ resource }: { resource: ResourceItem }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border p-6 md:p-8 hover:border-accent/40 hover:bg-accent/[0.02] transition-all"
    >
      <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
        {resource.title}
      </h3>
      <p className="text-sm leading-relaxed opacity-80">{resource.description}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        Consulter →
      </div>
    </a>
  );
}

function Section({
  label,
  title,
  resources,
}: {
  label: string;
  title: string;
  resources: ResourceItem[];
}) {
  return (
    <section className="animate-reveal">
      <div className="flex items-baseline justify-between mb-8 border-b-2 border-foreground pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-2">
            {label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((r) => (
          <ResourceCard key={r.title} resource={r} />
        ))}
      </div>
    </section>
  );
}

function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <header className="mb-16 md:mb-24 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Bibliothèque
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance max-w-4xl mb-6">
            Ressources.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-80">
            Documents magistériels et ressources numériques pour la pratique de la musique liturgique.
          </p>
        </header>

        <div className="space-y-20 md:space-y-28">
          <Section
            label="Textes de l'Église"
            title="Documents magistériels"
            resources={magisterialDocuments}
          />
          <Section
            label="En ligne"
            title="Ressources numériques"
            resources={digitalResources}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
