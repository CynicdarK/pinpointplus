"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function formatPrice(value: string | null) {
  if (!value) return "No data";
  return `$${(Number(value) / 100000000).toFixed(2)}`;
}

export default function MarketTable() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  async function loadListings() {
    const response = await fetch("/api/listings", { cache: "no-store" });
    const json = await response.json();

    setListings(json.data?.searchPinnacleNftAggregation?.edges ?? []);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  }

  useEffect(() => {
    loadListings();

    const interval = setInterval(() => {
      loadListings();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 rounded-xl bg-slate-800 p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Marketplace Overview</h2>
          <p className="mt-2 text-sm text-slate-400">
            Rows are grouped by pin/edition. Click exact listings to see serial-level prices.
          </p>
        </div>

        <div className="shrink-0 rounded-lg bg-slate-900 px-4 py-3 text-right text-sm text-slate-400">
          <div>Auto-refresh: 10s</div>
          <div>Last updated: {lastUpdated || "Loading..."}</div>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 text-slate-400">Loading live marketplace data...</div>
      ) : (
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
                  <td className="py-4">
                    <Link
                      href={`/market/edition/${editionId}`}
                      className="font-semibold hover:text-blue-400"
                    >
                      {node.edition.shape.name.value}
                    </Link>
                  </td>
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
      )}
    </div>
  );
}