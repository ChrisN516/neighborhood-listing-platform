-- Profiles: users may access only their own profile.
GRANT SELECT ON public.profiles TO authenticated;
GRANT INSERT (id, display_name) ON public.profiles TO authenticated;
GRANT UPDATE (display_name) ON public.profiles TO authenticated;

CREATE POLICY profiles_select_own
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY profiles_insert_own
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

CREATE POLICY profiles_update_own
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Properties: the public sees approved listings.
GRANT SELECT ON public.properties TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.properties TO authenticated;

CREATE POLICY properties_public_read
ON public.properties
FOR SELECT
TO anon, authenticated
USING (
  approved = true
  AND listing_status IN ('for_sale', 'pending', 'sold')
);

CREATE POLICY properties_owner_read
ON public.properties
FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY properties_owner_insert
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (
  owner_id = auth.uid()
  AND approved = false
);

CREATE POLICY properties_owner_update_unapproved
ON public.properties
FOR UPDATE
TO authenticated
USING (
  owner_id = auth.uid()
  AND approved = false
)
WITH CHECK (
  owner_id = auth.uid()
  AND approved = false
);

CREATE POLICY properties_owner_delete_unapproved
ON public.properties
FOR DELETE
TO authenticated
USING (
  owner_id = auth.uid()
  AND approved = false
);

-- Sponsors: the public sees active sponsors.
GRANT SELECT ON public.sponsors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sponsors TO authenticated;

CREATE POLICY sponsors_public_read
ON public.sponsors
FOR SELECT
TO anon, authenticated
USING (active = true);

CREATE POLICY sponsors_owner_read
ON public.sponsors
FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY sponsors_owner_insert
ON public.sponsors
FOR INSERT
TO authenticated
WITH CHECK (
  owner_id = auth.uid()
  AND active = false
);

CREATE POLICY sponsors_owner_update_inactive
ON public.sponsors
FOR UPDATE
TO authenticated
USING (
  owner_id = auth.uid()
  AND active = false
)
WITH CHECK (
  owner_id = auth.uid()
  AND active = false
);

CREATE POLICY sponsors_owner_delete_inactive
ON public.sponsors
FOR DELETE
TO authenticated
USING (
  owner_id = auth.uid()
  AND active = false
);

-- Property-sponsor links are public only when both records are public.
GRANT SELECT ON public.property_sponsors TO anon, authenticated;
GRANT INSERT, DELETE ON public.property_sponsors TO authenticated;

CREATE POLICY property_sponsors_public_read
ON public.property_sponsors
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.properties
    WHERE properties.id = property_sponsors.property_id
      AND properties.approved = true
  )
  AND EXISTS (
    SELECT 1
    FROM public.sponsors
    WHERE sponsors.id = property_sponsors.sponsor_id
      AND sponsors.active = true
  )
);

CREATE POLICY property_sponsors_owner_read
ON public.property_sponsors
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.properties
    WHERE properties.id = property_sponsors.property_id
      AND properties.owner_id = auth.uid()
  )
);

CREATE POLICY property_sponsors_owner_insert
ON public.property_sponsors
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.properties
    WHERE properties.id = property_sponsors.property_id
      AND properties.owner_id = auth.uid()
      AND properties.approved = false
  )
);

CREATE POLICY property_sponsors_owner_delete
ON public.property_sponsors
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.properties
    WHERE properties.id = property_sponsors.property_id
      AND properties.owner_id = auth.uid()
      AND properties.approved = false
  )
);

-- Anyone may submit an inquiry, but only owners may manage its status.
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT SELECT ON public.inquiries TO authenticated;
GRANT UPDATE (status) ON public.inquiries TO authenticated;

CREATE POLICY inquiries_public_insert
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  profile_id IS NULL
  OR profile_id = auth.uid()
);

CREATE POLICY inquiries_owner_or_sender_read
ON public.inquiries
FOR SELECT
TO authenticated
USING (
  profile_id = auth.uid()
  OR EXISTS (
    SELECT 1
    FROM public.properties
    WHERE properties.id = inquiries.property_id
      AND properties.owner_id = auth.uid()
  )
);

CREATE POLICY inquiries_property_owner_update
ON public.inquiries
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.properties
    WHERE properties.id = inquiries.property_id
      AND properties.owner_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.properties
    WHERE properties.id = inquiries.property_id
      AND properties.owner_id = auth.uid()
  )
);

-- Trusted server-side administration only.
GRANT ALL PRIVILEGES ON TABLE
  public.profiles,
  public.properties,
  public.sponsors,
  public.property_sponsors,
  public.inquiries
TO service_role;

-- No client-side admin policy is created.
-- Administrative work must use a server-only secret/service-role key.