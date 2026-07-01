import AppShell from "../../components/AppShell";

export default function MarketPage() {
  const marketTabs = ["Listings", "Mints", "Transfers", "Sales", "Capsule Openings"];

  return (
    <AppShell>
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
          <p className="text-sm text-slate-400">
            Placeholder table for marketplace data.
          </p>
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
    </AppShell>
  );
}