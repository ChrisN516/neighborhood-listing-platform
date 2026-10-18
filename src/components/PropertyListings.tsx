"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/types";

interface ApiProperty {
  id: string;
  title: string;
  street_address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  image_url: string | null;
  property_details_url: string | null;
}

interface ListingsResponse {
  data?: ApiProperty[];
  error?: string;
}

export default function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [status, setStatus] = useState<
    "loading" | "success" | "empty" | "error"
  >("loading");
  const [reloadNumber, setReloadNumber] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProperties() {
      setStatus("loading");

      try {
        const response = await fetch("/api/listings", {
          signal: controller.signal,
        });

        const result = (await response.json()) as ListingsResponse;

        if (!response.ok) {
          throw new Error(result.error ?? "Unable to load property listings.");
        }

        const apiProperties = result.data ?? [];

        const mappedProperties: Property[] = apiProperties.map((property) => ({
          id: property.id,
          title: property.title,
          streetAddress: property.street_address,
          city: property.city,
          state: property.state,
          price: Number(property.price),
          bedrooms: property.bedrooms,
          bathrooms: Number(property.bathrooms),
          squareFootage: property.square_feet,
          imageUrl: property.image_url?.includes("images.example.com")
  ? "/property-home.svg"
  : property.image_url ?? "/property-home.svg",
          propertyDetailsUrl:
            property.property_details_url ?? `/api/listings/${property.id}`,
        }));

        setProperties(mappedProperties);
        setStatus(mappedProperties.length === 0 ? "empty" : "success");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setStatus("error");
      }
    }

    void loadProperties();

    return () => controller.abort();
  }, [reloadNumber]);

  if (status === "loading") {
    return (
      <p role="status" aria-live="polite" className="rounded-md bg-white p-6">
        Loading property listings...
      </p>
    );
  }

  if (status === "error") {
    return (
      <div
        role="alert"
        className="rounded-md border border-red-300 bg-red-50 p-6 text-red-800"
      >
        <p>Property listings could not be loaded.</p>
        <button
          type="button"
          onClick={() => setReloadNumber((number) => number + 1)}
          className="mt-3 rounded-md bg-red-700 px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <p role="status" className="rounded-md bg-white p-6">
        No approved property listings are currently available.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </ul>
  );
}