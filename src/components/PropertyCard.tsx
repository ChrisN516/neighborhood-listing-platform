"use client";

import Image from "next/image";
import { useState } from "react";
import type { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Image
        src={property.imageUrl}
        alt={`Listing illustration for ${property.title} at ${property.streetAddress}, ${property.city}, ${property.state}`}
        width={600}
        height={400}
        className="h-48 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold text-gray-900">
          {property.title}
        </h3>

        <address className="not-italic text-gray-700">
          {property.streetAddress}, {property.city}, {property.state}
        </address>

        <p className="text-lg font-bold text-gray-900">{formattedPrice}</p>

        <ul
          aria-label="Property facts"
          className="flex flex-wrap gap-4 text-sm text-gray-700"
        >
          <li>{property.bedrooms} bedrooms</li>
          <li>{property.bathrooms} bathrooms</li>
          <li>{property.squareFootage.toLocaleString()} square feet</li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsFavorite((favorite) => !favorite)}
            aria-pressed={isFavorite}
            aria-label={`${isFavorite ? "Remove" : "Add"} ${property.title} ${
              isFavorite ? "from" : "to"
            } favorites`}
            className="rounded-md border border-blue-700 px-4 py-2 font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {isFavorite ? "Saved" : "Save property"}
          </button>

          <a
            href={property.propertyDetailsUrl}
            className="inline-block rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            View details for {property.title}
          </a>
        </div>
      </div>
    </article>
  );
}