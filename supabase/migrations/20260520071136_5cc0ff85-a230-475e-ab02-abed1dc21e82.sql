ALTER TABLE public.scores
ADD COLUMN labels text[] NOT NULL DEFAULT '{}';

CREATE INDEX idx_scores_labels ON public.scores USING GIN(labels);