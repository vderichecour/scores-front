
-- Restreindre handle_new_user (appelée uniquement par le trigger)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role : utilisée dans les policies RLS, on retire l'accès anon mais on le garde pour authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

-- Bucket public : les URLs publiques fonctionnent sans policy SELECT, on retire donc la policy
-- qui permettait de lister tout le bucket
DROP POLICY IF EXISTS "Anyone can read score PDFs" ON storage.objects;
