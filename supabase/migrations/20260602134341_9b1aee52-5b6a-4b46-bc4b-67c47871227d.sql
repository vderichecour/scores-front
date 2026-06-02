
-- Slug generation helper (unaccent-lite, basic ASCII fallback)
CREATE OR REPLACE FUNCTION public.slugify(input text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT trim(both '-' from
    regexp_replace(
      regexp_replace(
        lower(
          translate(
            coalesce(input, ''),
            'àáâãäåāăąèéêëēĕėęěìíîïĩīĭįıòóôõöøōŏőùúûüũūŭůűųñçćĉċčÿýŷÀÁÂÃÄÅĀĂĄÈÉÊËĒĔĖĘĚÌÍÎÏĨĪĬĮİÒÓÔÕÖØŌŎŐÙÚÛÜŨŪŬŮŰŲÑÇĆĈĊČŸÝŶ',
            'aaaaaaaaaeeeeeeeeeiiiiiiiiioooooooooouuuuuuuuuunccccyyyaaaaaaaaaeeeeeeeeeiiiiiiiiioooooooooouuuuuuuuuunccccy'
          )
        ),
        '[^a-z0-9]+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
$$;

ALTER TABLE public.scores
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS slug text;

-- Backfill slug from title
UPDATE public.scores
SET slug = public.slugify(title) || '-' || substr(id::text, 1, 6)
WHERE slug IS NULL;

ALTER TABLE public.scores
  ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS scores_slug_key ON public.scores (slug);
