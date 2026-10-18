ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.properties FORCE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors FORCE ROW LEVEL SECURITY;
ALTER TABLE public.property_sponsors FORCE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries FORCE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON public.profiles
FROM anon, authenticated;

REVOKE ALL PRIVILEGES ON public.properties
FROM anon, authenticated;

REVOKE ALL PRIVILEGES ON public.sponsors
FROM anon, authenticated;

REVOKE ALL PRIVILEGES ON public.property_sponsors
FROM anon, authenticated;

REVOKE ALL PRIVILEGES ON public.inquiries
FROM anon, authenticated;