// import { JSON_HEADER } from "@/lib/constants/api.constant";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// // Handle GET requests to fetch orders
// export async function GET(req: NextRequest) {
//   // Construct the base API URL for orders
//   const baseUrl = new URL(`${process.env.API_BASE_URL}/orders`);
//   const token = await getToken({ req });
//   console.log("token", token);

//   if (!token || !token.token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Fetch the orders from the API
//     const response = await fetch(baseUrl, {
//       headers: { ...JSON_HEADER, Authorization: `Bearer ${token.token}` },
//     });

//     // Parse the response payload
//     const payload = await response.json();
//     console.log("payload", payload);

//     const orders = payload?.orders || [];

//     // Return the extracted orders as a JSON response
//     return new NextResponse(JSON.stringify(orders), {
//       status: response.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: unknown) {
//     // Handle unexpected errors
//     console.error("Error fetching orders:", error instanceof Error ? error.message : String(error));
//     return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
//   }
// }
