"use client";

import { useState, type FormEvent } from "react";

export default function SearchFilters() {
  const [statusMessage, setStatusMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const neighborhood = formData.get("neighborhood") || "all neighborhoods";
    const maximumPrice = formData.get("maximumPrice") || "any price";

    setStatusMessage(
      `Filters applied for ${neighborhood} with a maximum price of ${maximumPrice}.`,
    );
  }

  return (
    <section
      aria-labelledby="search-filters-heading"
      className="rounded-lg bg-gray-100 p-5"
    >
      <h2
        id="search-filters-heading"
        className="text-xl font-semibold text-gray-900"
      >
        Search properties
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-4 grid gap-4 md:grid-cols-3 md:items-end"
      >
        <div>
          <label
            htmlFor="neighborhood"
            className="block font-medium text-gray-900"
          >
            Neighborhood
          </label>
          <select
            id="neighborhood"
            name="neighborhood"
            defaultValue=""
            className="mt-1 w-full rounded-md border border-gray-400 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <option value="">All neighborhoods</option>
            <option value="Downtown">Downtown</option>
            <option value="Riverside">Riverside</option>
            <option value="Westside">Westside</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="maximumPrice"
            className="block font-medium text-gray-900"
          >
            Maximum price
          </label>
          <select
            id="maximumPrice"
            name="maximumPrice"
            defaultValue=""
            className="mt-1 w-full rounded-md border border-gray-400 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <option value="">Any price</option>
            <option value="$500,000">$500,000</option>
            <option value="$750,000">$750,000</option>
            <option value="$1,000,000">$1,000,000</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Apply filters
        </button>
      </form>

      <p className="mt-3 text-sm text-gray-700" aria-live="polite">
        {statusMessage}
      </p>
    </section>
  );
}