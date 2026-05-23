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
  author?: string;
  description: string;
  url: string;
  tags: string[];
};

const ecclesialResources: ResourceItem[] = [
  {
    title: "Sacrosanctum Concilium",
    author: "Concile Vatican II",
    description:
      "Constitution sur la sainte Liturgie (1963). Texte fondamental qui réforme la liturgie catholique et pose les bases de la musique sacrée contemporaine.",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_fr.html",
    tags: ["Vatican II", "Constitution", "Réforme liturgique"],
  },
  {
    title: "Tra le sollecitudini",
    author: "Pape Pie X",
    description:
      "Motu proprio sur la musique sacrée (1903). Définit les principes de la musique liturgique : sainteté, beauté, universalité.",
    url: "https://www.vatican.va/holy_father/pius_x/motu_proprio/documents/hf_p-x_motu-proprio_19031122_inter-sollicitudines_fr.html",
    tags: ["Pie X", "Musique sacrée", "Motu proprio"],
  },
  {
    title: "Musicae sacrae disciplina",
    author: "Pape Pie XII",
    description:
      "Encyclique sur la musique sacrée (1955). Approfondit la doctrine liturgique sur le chant et l'orgue dans la célébration.",
    url: "https://www.vatican.va/holy_father/pius_xii/encyclicals/documents/hf_p-xii_enc_25121955_musicae-sacrae_fr.html",
    tags: ["Pie XII", "Encyclique", "Orgue"],
  },
];

const referenceWorks: ResourceItem[] = [
  {
    title: "Le Graduel Romain",
    author: "Abbaye de Solesmes",
    description:
      "Livre liturgique contenant les chants de l'Ordinaire et du Propre de la messe. Édition critique de référence pour le chant grégorien.",
    url: "https://www.solesmes.com/",
    tags: ["Grégorien", "Messe", "Solesmes"],
  },
  {
    title: "Liber Usualis",
    author: "Abbaye de Solesmes",
    description:
      "Recueil pratique des chants grégoriens les plus courants : messe, vêpres, processions. Indispensable pour tout chantre.",
    url: "https://www.solesmes.com/",
    tags: ["Grégorien", "Recueil", "Pratique"],
  },
];

const onlineResources: ResourceItem[] = [
  {
    title: "GregoBase",
    description:
      "Base de données collaborative de partitions grégoriennes en format gabc. Permet de générer des partitions prêtes à imprimer.",
    url: "https://gregobase.seldom.it/",
    tags: ["Grégorien", "Partitions", "Collaboratif"],
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
      <div className="flex flex-wrap gap-1.5 mb-4">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-foreground/20 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
        {resource.title}
      </h3>
      {resource.author && (
        <p className="font-mono text-xs opacity-60 mb-3">{resource.author}</p>
      )}
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
            Documents fondateurs, ouvrages de référence et ressources en ligne
            pour la pratique de la musique liturgique.
          </p>
        </header>

        <div className="space-y-20 md:space-y-28">
          <Section
            label="Textes de l'Église"
            title="Documents ecclésiaux"
            resources={ecclesialResources}
          />
          <Section
            label="Ouvrages"
            title="Répertoires et traités"
            resources={referenceWorks}
          />
          <Section
            label="En ligne"
            title="Ressources numériques"
            resources={onlineResources}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
