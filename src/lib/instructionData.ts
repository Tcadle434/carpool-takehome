import { env } from "~/env.mjs";

export async function getInstructionData(accountId: string) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("x-api-key", env.API_KEY);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const size = 100;
    const sort = "desc";
    const response = await fetch(
      `https://mainnet.carpool.dev/query/solana/instructions/BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY/account/${accountId}%09?size=${size}&sort=${sort}`,
      requestOptions
    );
    const responseObject = await response.json();
    return responseObject.instructions;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
