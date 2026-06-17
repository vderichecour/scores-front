-- Use slugified title as primary key; drop redundant slug column.

ALTER TABLE public.scores ADD COLUMN id_new text;

WITH ranked AS (
  SELECT
    id,
    public.slugify(title) AS base,
    ROW_NUMBER() OVER (PARTITION BY public.slugify(title) ORDER BY created_at) AS rn
  FROM public.scores
)
UPDATE public.scores s
SET id_new = CASE WHEN r.rn = 1 THEN r.base ELSE r.base || '-' || r.rn END
FROM ranked r
WHERE s.id = r.id;

ALTER TABLE public.scores ALTER COLUMN id_new SET NOT NULL;

ALTER TABLE public.scores DROP CONSTRAINT scores_pkey;
ALTER TABLE public.scores DROP COLUMN id;
ALTER TABLE public.scores RENAME COLUMN id_new TO id;
ALTER TABLE public.scores ADD PRIMARY KEY (id);

DROP INDEX IF EXISTS scores_slug_key;
ALTER TABLE public.scores DROP COLUMN IF EXISTS slug;
