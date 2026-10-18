import PropertyListings from "../components/PropertyListings";
import SearchFilters from "../components/SearchFilters";
import SponsorBanner from "../components/SponsorBanner";
import { sponsor, validationMessage } from "../lib/property-data";

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

        {validationMessage && (
          <p
            role="alert"
            className="rounded-md border border-red-300 bg-red-50 p-4 text-red-800"
          >
            {validationMessage}
          </p>
        )}

        <section aria-labelledby="listings-heading">
          <h2
            id="listings-heading"
            className="mb-5 text-2xl font-bold text-slate-900"
          >
            Available properties
          </h2>

          <PropertyListings />
        </section>

        {sponsor && <SponsorBanner sponsor={sponsor} />}
      </div>
    </main>
  );
}