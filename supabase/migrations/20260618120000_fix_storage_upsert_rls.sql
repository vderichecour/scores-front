-- Storage upsert (upload with upsert:true) needs SELECT + UPDATE WITH CHECK for admins.
-- Also ensure scores UPDATE has explicit WITH CHECK.

CREATE POLICY "Admins can read score PDFs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'scores' AND (SELECT private.is_admin()));

DROP POLICY IF EXISTS "Admins can update score PDFs" ON storage.objects;
CREATE POLICY "Admins can update score PDFs"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'scores' AND (SELECT private.is_admin()))
  WITH CHECK (bucket_id = 'scores' AND (SELECT private.is_admin()));

DROP POLICY IF EXISTS "Admins can update scores" ON public.scores;
CREATE POLICY "Admins can update scores"
  ON public.scores FOR UPDATE
  TO authenticated
  USING ((SELECT private.is_admin()))
  WITH CHECK ((SELECT private.is_admin()));

-- Ensure admin account has role (safe if already present)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'clement.c.portal@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
