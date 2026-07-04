import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type Score = {
  id: string;
  title: string;
  author: string | null;
  composer: string;
  pdf_path: string;
  labels: string[] | null;
  description: string | null;
  created_at: string;
};

async function fetchScore(id: string): Promise<Score | null> {
  const { data } = await supabase
    .from("scores")
    .select("id,title,author,composer,pdf_path,labels,description,created_at")
    .eq("id", id)
    .maybeSingle();

  return (data as Score | null) ?? null;
}

export const Route = createFileRoute("/scores/$slug")({
  loader: async ({ params }) => fetchScore(params.slug),
  head: ({ loaderData, params }) => {
    const partitionTitle = loaderData?.title ?? params.slug;
    const composer = loaderData?.composer?.trim();
    const author = loaderData?.author?.trim();
    const isTraditionalComposer = composer?.toLowerCase() === "traditionnel";
    const shouldShowComposer = composer && !isTraditionalComposer;
    const metaTitle = shouldShowComposer
      ? `${partitionTitle} (${composer}) - Clément Portal`
      : `${partitionTitle} - Clément Portal`;
    const description = author
      ? shouldShowComposer
        ? `Partition liturgique sur un texte de ${author}, composée par ${composer}, librement disponible au téléchargement.`
        : `Partition liturgique sur un texte de ${author}, librement disponible au téléchargement.`
      : shouldShowComposer
        ? `Partition liturgique composée par ${composer}, librement disponible au téléchargement.`
        : isTraditionalComposer
          ? "Partition liturgique traditionnelle, librement disponible au téléchargement."
          : "Partition liturgique librement disponible au téléchargement.";

    return {
      meta: [
        { title: metaTitle },
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: metaTitle },
        {
          property: "og:description",
          content: description,
        },
        { name: "twitter:title", content: metaTitle },
        {
          name: "twitter:description",
          content: description,
        },
      ],
    };
  },
  component: ScoreDetailPage,
  notFoundComponent: NotFound,
});

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

function pdfUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/scores/${path}`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-black mb-4">Partition introuvable</h1>
        <p className="opacity-70 mb-8">
          Cette partition n'existe pas ou a été retirée du catalogue.
        </p>
        <Link
          to="/scores"
          className="inline-block px-5 py-3 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
        >
          ← Retour au catalogue
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}

function ScoreDetailPage() {
  const score = Route.useLoaderData();

  if (score === null) return <NotFound />;

  const url = pdfUrl(score.pdf_path);

  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Fil d'Ariane */}
        <nav className="mb-10 font-mono text-[11px] uppercase tracking-widest opacity-60">
          <Link to="/scores" className="hover:text-accent transition-colors">
            ← Catalogue
          </Link>
        </nav>

        {/* En-tête : titre + méta */}
        <header className="mb-12 animate-reveal border-b-2 border-foreground pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Partition · {formatDate(score.created_at)}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[0.95] text-balance mb-6">
            {score.title}
          </h1>

          <dl className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2 mt-6 text-sm font-mono">
            <dt className="opacity-50 uppercase tracking-widest text-[10px]">Compositeur</dt>
            <dd>{score.composer}</dd>
            {score.author && (
              <>
                <dt className="opacity-50 uppercase tracking-widest text-[10px]">Auteur</dt>
                <dd>{score.author}</dd>
              </>
            )}
            {score.labels && score.labels.length > 0 && (
              <>
                <dt className="opacity-50 uppercase tracking-widest text-[10px]">Étiquettes</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {score.labels.map((l) => (
                    <span
                      key={l}
                      className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-foreground/30"
                    >
                      {l}
                    </span>
                  ))}
                </dd>
              </>
            )}
          </dl>
        </header>

        {/* Paragraphe explicatif */}
        {score.description && (
          <section className="mb-14 animate-reveal max-w-3xl">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-4">
              Présentation
            </h2>
            <div className="text-lg leading-relaxed opacity-90 whitespace-pre-line">
              {score.description}
            </div>
          </section>
        )}

        {/* Partition */}
        <section className="mb-10 animate-reveal">
          <div className="flex items-baseline justify-between mb-4 gap-4 flex-wrap">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
              Partition
            </h2>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-foreground text-background text-[11px] font-mono uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Télécharger le PDF
            </a>
          </div>
          <div className="border border-border bg-muted/20 aspect-[3/4] w-full overflow-hidden">
            <iframe
              src={url}
              title={`Aperçu — ${score.title}`}
              className="w-full h-full"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
