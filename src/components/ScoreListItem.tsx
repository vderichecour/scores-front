import { Link } from "@tanstack/react-router";
import { formatScoreDate, pdfUrl, type ScoreListItem } from "@/lib/scores";

const labelClass =
  "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-foreground/30";

type ScoreListItemProps = {
  score: ScoreListItem;
  onLabelClick?: (label: string) => void;
};

export function ScoreListItemRow({ score, onLabelClick }: ScoreListItemProps) {
  return (
    <article className="group py-4 md:py-8 hover:bg-accent/[0.03] transition-colors px-2 -mx-2 md:px-4 md:-mx-4">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="min-w-0 flex-[1.4] md:flex-[5]">
          <h3 className="truncate text-base md:text-2xl font-display font-semibold group-hover:text-accent transition-colors">
            <Link
              to="/scores/$slug"
              params={{ slug: score.id }}
              className="hover:underline"
            >
              {score.title}
            </Link>
          </h3>
          {score.author && (
            <p className="hidden md:block text-sm italic opacity-60">{score.author}</p>
          )}
        </div>
        <div className="min-w-0 flex-1 truncate font-mono text-[11px] md:text-sm opacity-75">
          {score.composer}
        </div>
        <div className="shrink-0">
          <a
            href={pdfUrl(score.pdf_path)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap px-2 py-1.5 md:px-4 md:py-2 border border-foreground text-[10px] md:text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
          >
            Télécharger PDF
          </a>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2">
        <span className="font-mono text-[11px] md:text-xs opacity-40 whitespace-nowrap">
          {formatScoreDate(score.created_at)}
        </span>
        {score.labels && score.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {score.labels.map((label) =>
              onLabelClick ? (
                <button
                  key={label}
                  type="button"
                  onClick={() => onLabelClick(label)}
                  className={`${labelClass} hover:border-accent hover:text-accent transition-colors`}
                >
                  {label}
                </button>
              ) : (
                <span key={label} className={labelClass}>
                  {label}
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </article>
  );
}
