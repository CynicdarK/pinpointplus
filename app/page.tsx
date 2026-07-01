import AppShell from "../components/AppShell";

export default function DashboardPage() {
  return (
    <AppShell>
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p className="mt-2 text-slate-400">
        Welcome to PinPointPlus.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-6">
        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-sm text-slate-400">Portfolio Value</p>
          <p className="mt-3 text-3xl font-bold">$0.00</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-sm text-slate-400">Live Listings</p>
          <p className="mt-3 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-sm text-slate-400">Sales Today</p>
          <p className="mt-3 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-sm text-slate-400">Collection Size</p>
          <p className="mt-3 text-3xl font-bold">0</p>
        </div>
      </div>
    </AppShell>
  );
}