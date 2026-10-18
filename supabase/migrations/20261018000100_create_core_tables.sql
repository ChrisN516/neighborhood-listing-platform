CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL
    CHECK (char_length(trim(display_name)) > 0),
  role TEXT NOT NULL DEFAULT 'resident'
    CHECK (role IN ('resident', 'agent', 'sponsor', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL
    CHECK (char_length(trim(title)) > 0),
  description TEXT,
  street_address TEXT NOT NULL
    CHECK (char_length(trim(street_address)) > 0),
  city TEXT NOT NULL
    CHECK (char_length(trim(city)) > 0),
  state TEXT NOT NULL
    CHECK (state ~ '^[A-Z]{2}$'),
  zip_code TEXT NOT NULL
    CHECK (zip_code ~ '^[0-9]{5}(-[0-9]{4})?$'),
  price NUMERIC(12, 2) NOT NULL
    CHECK (price > 0),
  bedrooms INTEGER NOT NULL
    CHECK (bedrooms >= 0),
  bathrooms NUMERIC(3, 1) NOT NULL
    CHECK (bathrooms >= 0),
  square_feet INTEGER NOT NULL
    CHECK (square_feet > 0),
  property_type TEXT NOT NULL
    CHECK (property_type IN (
      'house',
      'condo',
      'townhouse',
      'apartment',
      'land',
      'other'
    )),
  listing_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (listing_status IN (
      'draft',
      'for_sale',
      'pending',
      'sold',
      'archived'
    )),
  amenities TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  property_details_url TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL
    CHECK (char_length(trim(business_name)) > 0),
  website_url TEXT NOT NULL
    CHECK (char_length(trim(website_url)) > 0),
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.property_sponsors (
  property_id UUID NOT NULL
    REFERENCES public.properties(id) ON DELETE CASCADE,
  sponsor_id UUID NOT NULL
    REFERENCES public.sponsors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (property_id, sponsor_id)
);

CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL
    REFERENCES public.properties(id) ON DELETE CASCADE,
  profile_id UUID
    REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL
    CHECK (char_length(trim(name)) > 0),
  email TEXT NOT NULL
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message TEXT NOT NULL
    CHECK (
      char_length(trim(message)) >= 5
      AND char_length(message) <= 3000
    ),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER properties_set_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER sponsors_set_updated_at
BEFORE UPDATE ON public.sponsors
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER inquiries_set_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX properties_owner_id_idx
  ON public.properties(owner_id);

CREATE INDEX properties_public_listing_idx
  ON public.properties(approved, listing_status);

CREATE INDEX properties_location_idx
  ON public.properties(city, state);

CREATE INDEX sponsors_owner_id_idx
  ON public.sponsors(owner_id);

CREATE INDEX sponsors_active_idx
  ON public.sponsors(active);

CREATE INDEX property_sponsors_sponsor_id_idx
  ON public.property_sponsors(sponsor_id);

CREATE INDEX inquiries_property_id_idx
  ON public.inquiries(property_id);

CREATE INDEX inquiries_profile_id_idx
  ON public.inquiries(profile_id);