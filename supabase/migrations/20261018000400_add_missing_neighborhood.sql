-- Add the neighborhood column missing from the live database.
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS neighborhood TEXT;

-- Give existing properties a neighborhood value.
UPDATE public.properties
SET neighborhood = city
WHERE neighborhood IS NULL OR char_length(trim(neighborhood)) = 0;

-- Require all future properties to have a neighborhood.
ALTER TABLE public.properties
ALTER COLUMN neighborhood SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'check_properties_neighborhood_not_blank'
    ) THEN
        ALTER TABLE public.properties
        ADD CONSTRAINT check_properties_neighborhood_not_blank
        CHECK (char_length(trim(neighborhood)) > 0);
    END IF;
END
$$;