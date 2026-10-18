import { z } from "zod";

export const propertyCreateSchema = z
  .object({
    title: z.string().trim().min(3).max(150),
    description: z.string().trim().max(3000).optional(),
    neighborhood: z.string().trim().min(1).max(100),
    street_address: z.string().trim().min(5).max(200),
    city: z.string().trim().min(1).max(100),
    state: z.string().trim().length(2).toUpperCase(),
    zip_code: z.string().regex(/^\d{5}(-\d{4})?$/),
    price: z.number().positive(),
    bedrooms: z.number().int().nonnegative(),
    bathrooms: z.number().nonnegative(),
    square_feet: z.number().int().positive(),
    property_type: z.enum([
      "house",
      "townhouse",
      "condo",
      "apartment",
    ]),
    listing_status: z.enum(["for_sale", "pending", "sold"]),
    amenities: z.array(z.string().trim().min(1)).max(20).default([]),
    image_url: z.url().optional(),
    property_details_url: z.url().optional(),
  })
  .strict();

export const propertyUpdateSchema = propertyCreateSchema
  .partial()
  .refine((values) => Object.keys(values).length > 0, {
    message: "At least one property field must be provided.",
  });