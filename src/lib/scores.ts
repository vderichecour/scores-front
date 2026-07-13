export type ScoreListItem = {
  id: string;
  title: string;
  author: string | null;
  composer: string;
  pdf_path: string;
  labels: string[] | null;
  created_at: string;
};

export const SCORE_LIST_SELECT =
  "id,title,author,composer,pdf_path,labels,created_at" as const;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

export function pdfUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/scores/${path}`;
}

export function formatScoreDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
