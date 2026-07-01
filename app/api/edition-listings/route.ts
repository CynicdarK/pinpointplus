import { NextResponse } from "next/server";

const QUERY = `
query GetPinListingsForEdition($searchInput: SearchPinnacleNftAggregationsInput) {
  searchPinnacleNftAggregation(searchInput: $searchInput) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id {
          key
          value
        }
        owner_address {
          value
        }
        serial_number {
          value
        }
        listing {
          price {
            value
          }
          expiry {
            max
          }
        }
        edition {
          id {
            value
          }
          shape {
            name {
              value
            }
          }
        }
      }
    }
  }
}
`;

export async function GET(request: Request) {
  const token = process.env.PINNACLE_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing PINNACLE_TOKEN in .env.local" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const editionId = searchParams.get("editionId") ?? "2178";

  const response = await fetch(
    "https://api.production.studio-platform.dapperlabs.com/graphql?GetPinListingsForEdition",
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        "x-client": "disney-app",
        "x-id-token": token,
      },
      body: JSON.stringify({
        operationName: "GetPinListingsForEdition",
        variables: {
          searchInput: {
            first: 50,
            after: null,
            sortBy: {
              listing: {
                price: {
                  min: {
                    priority: 1,
                    direction: "ASC",
                  },
                },
                updated_at: {
                  block_height: {
                    max: {
                      priority: 3,
                      direction: "ASC",
                    },
                  },
                },
              },
              serial_number: {
                min: {
                  priority: 2,
                  direction: "ASC",
                },
              },
            },
            filters: [
              {
                edition: {
                  id: {
                    eq: editionId,
                  },
                },
                listing: {
                  exists: true,
                },
              },
            ],
          },
        },
        query: QUERY,
      }),
      cache: "no-store",
    }
  );

  const json = await response.json();

  return NextResponse.json(json);
}