import type { PropertyListing } from "../types";

// Unsafe version: TypeScript trusts the assertion without checking the data.
export async function getPropertyPrice(): Promise<string> {
  const response = await fetch("/api/properties/PROP-001");
  const externalInput: unknown = await response.json();

  const listing = externalInput as PropertyListing;

  return listing.price.toFixed(2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Runtime type guard that checks both data types and business rules.
export function isPropertyListing(
  value: unknown,
): value is PropertyListing {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.streetAddress === "string" &&
    typeof value.city === "string" &&
    typeof value.state === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price > 0 &&
    typeof value.bedrooms === "number" &&
    value.bedrooms >= 0 &&
    typeof value.bathrooms === "number" &&
    value.bathrooms >= 0 &&
    typeof value.squareFootage === "number" &&
    value.squareFootage > 0 &&
    typeof value.imageUrl === "string" &&
    typeof value.propertyDetailsUrl === "string"
  );
}

export function validatePropertyListing(
  value: unknown,
): PropertyListing {
  if (!isPropertyListing(value)) {
    throw new Error(
      "Invalid PropertyListing: field types or business rules failed.",
    );
  }

  return value;
}

// Safe version: validation occurs before the data is used.
export async function getValidatedPropertyPrice(): Promise<string> {
  const response = await fetch("/api/properties/PROP-001");
  const externalInput: unknown = await response.json();

  const listing = validatePropertyListing(externalInput);

  return listing.price.toFixed(2);
}