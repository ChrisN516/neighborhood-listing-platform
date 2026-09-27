import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import SponsorBanner from "../components/SponsorBanner";
import type { Property, Sponsor } from "../types";

const properties: Property[] = [
  {
    id: "property-101",
    title: "Maple Street Family Home",
    streetAddress: "125 Maple Street",
    city: "Los Angeles",
    state: "CA",
    price: 725000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1850,
    imageUrl: "/property-home.svg",
    propertyDetailsUrl: "/properties/maple-street-home",
  },
  {
    id: "property-102",
    title: "Downtown Modern Loft",
    streetAddress: "410 Grand Avenue",
    city: "Los Angeles",
    state: "CA",
    price: 595000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    imageUrl: "/property-home.svg",
    propertyDetailsUrl: "/properties/downtown-modern-loft",
  },
  {
    id: "property-103",
    title: "Riverside Garden Cottage",
    streetAddress: "88 River Road",
    city: "Los Angeles",
    state: "CA",
    price: 649000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1540,
    imageUrl: "/property-home.svg",
    propertyDetailsUrl: "/properties/riverside-garden-cottage",
  },
];

const sponsor: Sponsor = {
  id: "sponsor-201",
  businessName: "Habitat for Humanity",
  websiteUrl: "https://www.habitat.org/",
  description: "Supporting safe and affordable housing in communities.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Neighborhood Community Platform
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Discover available homes and organizations that support the
            community.
          </p>
        </header>

        <SearchFilters />

        <section aria-labelledby="listings-heading">
          <h2
            id="listings-heading"
            className="mb-5 text-2xl font-bold text-slate-900"
          >
            Available properties
          </h2>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        </section>

        <SponsorBanner sponsor={sponsor} />
      </div>
    </main>
  );
}