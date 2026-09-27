import type { Sponsor } from "../types";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  return (
    <aside
      aria-label={`Sponsored content from ${sponsor.businessName}`}
      className="rounded-lg border border-blue-200 bg-blue-50 p-5"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
        Sponsored
      </p>

      <h2 className="mt-2 text-xl font-semibold text-gray-900">
        {sponsor.businessName}
      </h2>

      {sponsor.description && (
        <p className="mt-2 text-gray-700">{sponsor.description}</p>
      )}

      <a
        href={sponsor.websiteUrl}
        aria-label={`Visit ${sponsor.businessName} website`}
        className="mt-3 inline-block font-semibold text-blue-800 underline hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Visit {sponsor.businessName}
      </a>
    </aside>
  );
}