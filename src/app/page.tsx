const features = [
  {
    title: "Listings",
    description: "Discover local homes, services, and opportunities.",
  },
  {
    title: "Neighborhood Sponsors",
    description: "Connect with organizations that support the community.",
  },
  {
    title: "Voice Help",
    description: "Use voice assistance to navigate listings more easily.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Neighborhood Listing Platform
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            A simple place for residents to explore listings, connect with
            neighborhood sponsors, and receive accessible voice help.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">
            Platform features
          </h2>

          <ul className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <li key={feature.title}>
                <article className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-slate-600">{feature.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
