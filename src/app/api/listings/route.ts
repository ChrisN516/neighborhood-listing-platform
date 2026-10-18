import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { propertyCreateSchema } from "@/lib/validation/property";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("properties")
      .select(
        `
          id,
          title,
          description,
          neighborhood,
          street_address,
          city,
          state,
          postal_code:zip_code,
          price,
          bedrooms,
          bathrooms,
          square_feet,
          property_type,
          status:listing_status,
          amenities,
          image_url,
          property_details_url,
          created_at
        `,
      )
      .eq("approved", true)
      .in("listing_status", ["for_sale", "pending", "sold"])
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Listings query failed.", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        { error: "Unable to load property listings." },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: data ?? [] });
  } catch {
    console.error("Listings route failed unexpectedly.");

    return NextResponse.json(
      { error: "Unable to load property listings." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication is required." },
        { status: 401 },
      );
    }

    let requestBody: unknown;

    try {
      requestBody = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    const validation = propertyCreateSchema.safeParse(requestBody);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Property information is invalid.",
          details: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("properties")
      .insert({
        ...validation.data,
        owner_id: user.id,
        approved: false,
      })
      .select("id, title, listing_status, approved")
      .single();

    if (error) {
      console.error("Property creation failed.", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        { error: "Unable to create the property." },
        { status: 500 },
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch {
    console.error("Property creation route failed unexpectedly.");

    return NextResponse.json(
      { error: "Unable to create the property." },
      { status: 500 },
    );
  }
}