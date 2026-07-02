import AppShell from "../../components/AppShell";
import MarketTable from "../../components/MarketTable";

export default function MarketPage() {
  return (
    <AppShell>
      <h1 className="text-4xl font-bold">Market</h1>

      <p className="mt-2 text-slate-400">
        Live Disney Pinnacle marketplace overview.
      </p>

      <MarketTable />
    </AppShell>
  );
}