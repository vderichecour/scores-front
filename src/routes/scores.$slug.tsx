import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/scores/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Partition — Clément Portal` },
      {
        name: "description",
        content: `Partition « ${params.slug} » — librement disponible au téléchargement.`,
      },
    ],
  }),
  component: ScoreDetailPage,
  notFoundComponent: NotFound,
});

type Score = {
  id: string;
  slug: string;
  title: string;
  author: string | null;
  composer: string;
  pdf_path: string;
  labels: string[] | null;
  description: string | null;
  created_at: string;
};

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
  const { slug } = Route.useParams();
  const [score, setScore] = useState<Score | null | undefined>(undefined);

  useEffect(() => {
    supabase
      .from("scores")
      .select("id,slug,title,author,composer,pdf_path,labels,description,created_at")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => setScore((data as Score | null) ?? null));
  }, [slug]);

  if (score === undefined) {
    return (
      <>
        <SiteHeader />
        <main className="max-w-4xl mx-auto px-6 py-24 text-sm font-mono opacity-60">
          Chargement…
        </main>
      </>
    );
  }

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
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await fetch(url);
                  const blob = await res.blob();
                  const blobUrl = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = blobUrl;
                  a.download = `${score.title}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                } catch {
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
              className="px-5 py-3 bg-foreground text-background text-[11px] font-mono uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Télécharger le PDF
            </button>
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
