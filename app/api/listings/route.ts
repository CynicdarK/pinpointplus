import { NextResponse } from "next/server";

const MARKETPLACE_QUERY = `
query SearchMarketplacePins($searchInput: SearchPinnacleNftAggregationsInput, $addresses: [String]) {
  searchPinnacleNftAggregation(searchInput: $searchInput) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      __typename
    }
    edges {
      node {
        serial_number {
          value
          __typename
        }
        id {
          value
          __typename
        }
        listing {
          created_at {
            block_time {
              value
              __typename
            }
            __typename
          }
          updated_at {
            block_time {
              value
              __typename
            }
            __typename
          }
          price {
            min
            max
            avg
            value
            counts {
              total
              __typename
            }
            __typename
          }
          expiry {
            max
            __typename
          }
          __typename
        }
        edition {
          chaser {
            value
            __typename
          }
          metadata {
            has_magic_reveal {
              value
              __typename
            }
            __typename
          }
          closed_date {
            block_time {
              value
              __typename
            }
            __typename
          }
          render_id {
            value
            __typename
          }
          set {
            truncatedName
            id {
              value
              __typename
            }
            render_id {
              key
              value
              __typename
            }
            medias {
              url
              name
              mediaType
              width
              height
              __typename
            }
            name {
              value
              __typename
            }
            __typename
          }
          medias {
            url
            name
            mediaType
            width
            height
            __typename
          }
          max_mint_size {
            value
            __typename
          }
          printing {
            value
            __typename
          }
          total_burned {
            value
            __typename
          }
          total_minted {
            value
            __typename
          }
          edition_type {
            id {
              value
              __typename
            }
            name {
              value
              __typename
            }
            __typename
          }
          variant {
            value
            __typename
          }
          shape {
            id {
              value
              __typename
            }
            name {
              value
              __typename
            }
            __typename
          }
          id {
            key
            value
            counts {
              total
              owned(addresses: $addresses) {
                address
                count
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`;

export async function GET() {
  const token = process.env.PINNACLE_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing PINNACLE_TOKEN in .env.local" },
      { status: 500 }
    );
  }

  const response = await fetch(
    "https://api.production.studio-platform.dapperlabs.com/graphql?SearchMarketplacePins",
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        "x-client": "disney-app",
        "x-id-token": token,
      },
      body: JSON.stringify({
        operationName: "SearchMarketplacePins",
        variables: {
          searchInput: {
            first: 24,
            sortBy: {
              listing: {
                updated_at: {
                  block_height: {
                    max: {
                      direction: "DESC",
                      priority: 1,
                    },
                  },
                },
              },
            },
            filters: [
              {
                listing: {
                  exists: true,
                },
              },
            ],
          },
        },
        query: MARKETPLACE_QUERY,
      }),
      cache: "no-store",
    }
  );

  const json = await response.json();

  return NextResponse.json(json);
}