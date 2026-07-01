import Link from "next/link";
import AppShell from "../../components/AppShell";

async function getListings() {
  const response = await fetch("http://localhost:3000/api/listings", {
    cache: "no-store",
  });

  const json = await response.json();

  return json.data?.searchPinnacleNftAggregation?.edges ?? [];
}

function formatPrice(value: string | null) {
  if (!value) return "No data";
  return `$${(Number(value) / 100000000).toFixed(2)}`;
}

export default async function MarketPage() {
  const listings = await getListings();

  return (
    <AppShell>
      <h1 className="text-4xl font-bold">Market</h1>

      <p className="mt-2 text-slate-400">
        Live Disney Pinnacle marketplace overview.
      </p>

      <div className="mt-6 rounded-xl bg-slate-800 p-6">
        <h2 className="text-2xl font-bold">Marketplace Overview</h2>

        <p className="mt-2 text-sm text-slate-400">
          Rows are grouped by pin/edition. Click exact listings to see serial-level prices.
        </p>

        <table className="mt-6 w-full text-left">
          <thead className="border-b border-slate-700 text-slate-400">
            <tr>
              <th className="pb-3">Pin</th>
              <th>Set</th>
              <th>Variant</th>
              <th>Lowest Ask</th>
              <th>Listings</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((edge: any) => {
              const node = edge.node;
              const editionId = node.edition.id.value;

              return (
                <tr key={node.id.value} className="border-b border-slate-700">
                  <td className="py-4">{node.edition.shape.name.value}</td>
                  <td>{node.edition.set.truncatedName}</td>
                  <td>{node.edition.variant.value}</td>
                  <td>{formatPrice(node.listing.price.value)}</td>
                  <td>{node.listing.price.counts.total}</td>
                  <td>
                    <Link
                      href={`/market/edition/${editionId}`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold hover:bg-blue-500"
                    >
                      Exact Listings
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}