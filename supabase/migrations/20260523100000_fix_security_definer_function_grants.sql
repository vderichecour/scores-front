-- Lint 0029: SECURITY DEFINER helpers belong outside exposed API schemas.
-- Move role checks to private.is_admin(); keep handle_new_user trigger-only.

CREATE SCHEMA IF NOT EXISTS private;

REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO postgres, authenticated, service_role;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = (SELECT auth.uid()) AND role = 'admin'
  )
$$;

GRANT EXECUTE ON FUNCTION private.is_admin() TO authenticated, service_role;

-- scores
DROP POLICY IF EXISTS "Admins can insert scores" ON public.scores;
DROP POLICY IF EXISTS "Admins can update scores" ON public.scores;
DROP POLICY IF EXISTS "Admins can delete scores" ON public.scores;

CREATE POLICY "Admins can insert scores"
  ON public.scores FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT private.is_admin()));

CREATE POLICY "Admins can update scores"
  ON public.scores FOR UPDATE
  TO authenticated
  USING ((SELECT private.is_admin()));

CREATE POLICY "Admins can delete scores"
  ON public.scores FOR DELETE
  TO authenticated
  USING ((SELECT private.is_admin()));

-- storage
DROP POLICY IF EXISTS "Admins can upload score PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update score PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete score PDFs" ON storage.objects;

CREATE POLICY "Admins can upload score PDFs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'scores' AND (SELECT private.is_admin()));

CREATE POLICY "Admins can update score PDFs"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'scores' AND (SELECT private.is_admin()));

CREATE POLICY "Admins can delete score PDFs"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'scores' AND (SELECT private.is_admin()));

-- contact_messages
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete contact messages" ON public.contact_messages;

CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING ((SELECT private.is_admin()));

CREATE POLICY "Admins can delete contact messages"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING ((SELECT private.is_admin()));

-- Remove public helper callable via PostgREST /rest/v1/rpc/has_role
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- Trigger-only: block direct RPC while keeping SECURITY DEFINER for inserts
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
