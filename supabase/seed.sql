DO $$
DECLARE
  seed_owner_id UUID;
BEGIN
  SELECT id
  INTO seed_owner_id
  FROM auth.users
  WHERE email = 'lab5-owner@example.com';

  IF seed_owner_id IS NULL THEN
    RAISE EXCEPTION
      'Create lab5-owner@example.com in Supabase Authentication first.';
  END IF;

  INSERT INTO public.profiles (
    id,
    display_name,
    role
  )
  VALUES (
    seed_owner_id,
    'Jordan Lee',
    'agent'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    display_name = EXCLUDED.display_name,
    role = EXCLUDED.role;

  INSERT INTO public.properties (
    id,
    owner_id,
    title,
    description,
    street_address,
    city,
    state,
    zip_code,
    price,
    bedrooms,
    bathrooms,
    square_feet,
    property_type,
    listing_status,
    amenities,
    image_url,
    property_details_url,
    approved
  )
  VALUES
  (
    '11111111-1111-4111-8111-111111111111',
    seed_owner_id,
    'Maple Street Family Home',
    'A fictional home near parks and neighborhood shops.',
    '125 Maple Street',
    'Sunnyvale',
    'CA',
    '94086',
    825000.00,
    3,
    2.0,
    1650,
    'house',
    'for_sale',
    ARRAY['Garage', 'Backyard', 'Solar Panels'],
    'https://images.example.com/maple-home.jpg',
    'https://listings.example.com/maple-home',
    true
  ),
  (
    '11111111-1111-4111-8111-111111111112',
    seed_owner_id,
    'Cedar Avenue Draft Condo',
    'A fictional draft listing used for access testing.',
    '408 Cedar Avenue',
    'Sunnyvale',
    'CA',
    '94087',
    515000.00,
    2,
    1.5,
    1050,
    'condo',
    'draft',
    ARRAY['Balcony', 'Community Pool'],
    'https://images.example.com/cedar-condo.jpg',
    'https://listings.example.com/cedar-condo',
    false
  )
  ON CONFLICT (id) DO UPDATE
  SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    listing_status = EXCLUDED.listing_status,
    approved = EXCLUDED.approved;

  INSERT INTO public.sponsors (
    id,
    owner_id,
    business_name,
    website_url,
    description,
    active
  )
  VALUES
  (
    '22222222-2222-4222-8222-222222222221',
    seed_owner_id,
    'Neighborhood Garden Care',
    'https://garden-care.example.com',
    'A fictional local landscaping sponsor.',
    true
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    seed_owner_id,
    'Community Home Repair',
    'https://home-repair.example.com',
    'A fictional inactive repair sponsor used for testing.',
    false
  )
  ON CONFLICT (id) DO UPDATE
  SET
    business_name = EXCLUDED.business_name,
    description = EXCLUDED.description,
    active = EXCLUDED.active;

  INSERT INTO public.property_sponsors (
    property_id,
    sponsor_id
  )
  VALUES (
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222221'
  )
  ON CONFLICT (property_id, sponsor_id) DO NOTHING;

  INSERT INTO public.inquiries (
    id,
    property_id,
    profile_id,
    name,
    email,
    message,
    status
  )
  VALUES (
    '33333333-3333-4333-8333-333333333333',
    '11111111-1111-4111-8111-111111111111',
    NULL,
    'Taylor Morgan',
    'taylor.morgan@example.com',
    'Is the fictional property available for a weekend tour?',
    'new'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    message = EXCLUDED.message,
    status = EXCLUDED.status;
END;
$$;