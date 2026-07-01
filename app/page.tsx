export default function Home() {
  const marketTabs = ["Listings", "Mints", "Transfers", "Sales", "Capsule Openings"];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold">PinPointPlus</h1>
          <p className="text-sm text-slate-400">Pinnacle analytics dashboard</p>
        </div>

        <input
          className="w-96 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm outline-none"
          placeholder="Search pins, users, sets..."
        />

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold">
          Login
        </button>
      </header>

      <div className="flex">
        <aside className="min-h-[calc(100vh-73px)] w-64 border-r border-slate-800 bg-slate-900 p-4">
          <nav className="space-y-2">
            {["Dashboard", "Market", "Collections", "Rankings", "Analytics", "Tools", "Settings"].map(
              (item) => (
                <button
                  key={item}
                  className={
                    item === "Market"
                      ? "w-full rounded-lg bg-blue-600 px-4 py-2 text-left font-semibold"
                      : "w-full rounded-lg px-4 py-2 text-left text-slate-300 hover:bg-slate-800"
                  }
                >
                  {item}
                </button>
              )
            )}
          </nav>
        </aside>

        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold">Market</h2>
          <p className="mt-1 text-slate-400">
            Track live listings, sales, transfers, mints, and capsule openings.
          </p>

          <div className="mt-6 flex w-fit rounded-lg bg-slate-800 p-2">
            {marketTabs.map((tab, index) => (
              <button
                key={tab}
                className={
                  index === 0
                    ? "rounded-md bg-black px-5 py-2 text-sm font-semibold"
                    : "rounded-md px-5 py-2 text-sm text-slate-300 hover:bg-slate-700"
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-5 py-4">
              <h3 className="font-semibold">Live Listings</h3>
              <p className="text-sm text-slate-400">Placeholder table for marketplace data.</p>
            </div>

            <div className="grid grid-cols-6 border-b border-slate-800 px-5 py-3 text-sm font-semibold text-slate-400">
              <div>Pin</div>
              <div>Variant</div>
              <div>Serial</div>
              <div>Price</div>
              <div>Seller</div>
              <div>Listed</div>
            </div>

            <div className="grid grid-cols-6 px-5 py-4 text-sm text-slate-300">
              <div>Ferb</div>
              <div>Silver Sparkle</div>
              <div>/424</div>
              <div>$1</div>
              <div>sampleuser</div>
              <div>Coming soon</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}