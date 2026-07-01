export default function Home() {
  const tabs = ["Listings", "Mints", "Transfers", "Sales", "Capsule Openings"];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700 bg-slate-800 p-6">
        <h1 className="text-4xl font-bold">PinPointPlus</h1>
        <p className="mt-2 text-slate-300">
          Pinnacle market analytics, collections, and tracking.
        </p>
      </header>

      <section className="p-6">
        <h2 className="mb-4 text-2xl font-semibold">Market</h2>

        <div className="flex w-fit rounded-lg bg-slate-700 p-2">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={
                index === 0
                  ? "rounded-md bg-black px-5 py-2 text-white"
                  : "rounded-md px-5 py-2 text-slate-200 hover:bg-slate-600"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-slate-800 p-6">
          Listings data coming soon...
        </div>
      </section>
    </main>
  );
}