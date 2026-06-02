
ALTER TABLE public.scores
  ALTER COLUMN slug SET DEFAULT gen_random_uuid()::text;
