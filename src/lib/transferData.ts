import { env } from "~/env.mjs";

export async function getTransferData() {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("x-api-key", env.API_KEY);

  var raw = JSON.stringify({
    must: {
      range: {
        timestamp: {
          gte: "now-1d/d",
          lt: "now",
        },
      },
    },
    aggregation: {
      terms: {
        field: "ixAccounts.treeAuthority",
        size: 100,
        order: {
          transferCount: "desc",
        },
      },
      aggregations: {
        transferCount: {
          value_count: {
            field: "name",
          },
        },
      },
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://mainnet.carpool.dev/query/solana/instructions/BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY/aggregate/transfer",
      requestOptions
    );
    const responseObject = await response.json();
    const buckets = responseObject.aggregation.buckets;

    return buckets.map((bucket: any) => {
      return {
        treeAuthority: bucket.key,
        transferCount: bucket.transferCount.value,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
