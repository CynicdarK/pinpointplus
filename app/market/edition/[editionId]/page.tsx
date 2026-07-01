import Link from "next/link";
import AppShell from "../../../../components/AppShell";

async function getExactListings(editionId: string) {
  const response = await fetch(
    `http://localhost:3000/api/edition-listings?editionId=${editionId}`,
    { cache: "no-store" }
  );

  const json = await response.json();
  return json.data?.searchPinnacleNftAggregation ?? null;
}

function formatPrice(value: string | null) {
  if (!value) return "No price";
  return `$${(Number(value) / 100000000).toFixed(2)}`;
}

function formatExpiry(value: string | null) {
  if (!value) return "—";

  const date = new Date(Number(value) * 1000);
  return date.toLocaleDateString();
}

function shortAddress(address: string | null) {
  if (!address) return "Unknown";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default async function EditionListingsPage({
  params,
}: {
  params: Promise<{ editionId: string }>;
}) {
  const { editionId } = await params;

  const data = await getExactListings(editionId);
  const listings = data?.edges ?? [];

  const firstNode = listings[0]?.node;
  const pinName = firstNode?.edition?.shape?.name?.value ?? "Exact Listings";

  return (
    <AppShell>
      <Link href="/market" className="text-sm text-blue-400 hover:text-blue-300">
        ← Back to Market
      </Link>

      <h1 className="mt-4 text-4xl font-bold">{pinName}</h1>

      <p className="mt-2 text-slate-400">
        Exact serial-level marketplace listings.
      </p>

      <div className="mt-6 rounded-xl bg-slate-800 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Exact Listings</h2>
          <p className="text-sm text-slate-400">
            {data?.totalCount ?? 0} active listings
          </p>
        </div>

        <table className="mt-6 w-full text-left">
          <thead className="border-b border-slate-700 text-slate-400">
            <tr>
              <th className="pb-3">Serial</th>
              <th>Price</th>
              <th>Owner Address</th>
              <th>Expires</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((edge: any) => {
              const node = edge.node;

              return (
                <tr key={node.id.value} className="border-b border-slate-700">
                  <td className="py-4">#{node.serial_number.value ?? "—"}</td>
                  <td className="font-semibold">
                    {formatPrice(node.listing.price.value)}
                  </td>
                  <td>{shortAddress(node.owner_address.value)}</td>
                  <td>{formatExpiry(node.listing.expiry.max)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}