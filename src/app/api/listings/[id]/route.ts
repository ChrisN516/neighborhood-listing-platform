import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { propertyUpdateSchema } from "@/lib/validation/property";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!z.string().uuid().safeParse(id).success) {
      return NextResponse.json(
        { error: "The property ID is invalid." },
        { status: 400 },
      );
    }

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

    const validation = propertyUpdateSchema.safeParse(requestBody);

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
      .update({
        ...validation.data,
        approved: false,
      })
      .eq("id", id)
      .eq("owner_id", user.id)
      .select("id, title, listing_status, approved")
      .maybeSingle();

    if (error) {
      console.error("Property update failed.", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        { error: "Unable to update the property." },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Property not found or access denied." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data });
  } catch {
    console.error("Property update route failed unexpectedly.");

    return NextResponse.json(
      { error: "Unable to update the property." },
      { status: 500 },
    );
  }
}