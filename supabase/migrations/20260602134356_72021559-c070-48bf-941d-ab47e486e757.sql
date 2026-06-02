
CREATE OR REPLACE FUNCTION public.slugify(input text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SECURITY INVOKER
SET search_path = public
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

REVOKE EXECUTE ON FUNCTION public.slugify(text) FROM PUBLIC, anon, authenticated;
