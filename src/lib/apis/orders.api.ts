import { JSON_HEADER } from "@/lib/constants/api.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function fetchOrders() {
  // Get the token from cookies
  const token = cookies().get("next-auth.session-token")?.value;

  if (!token) {
    throw new Error("Authentication token is missing. Please login to view your orders.");
  }

  // Decode the session token to extract user information
  const userToken = await decode({ secret: process.env.NEXTAUTH_SECRET!, token });

  const response = await fetch(process.env.API + `/orders`, {
    headers: { ...JSON_HEADER, Authorization: `Bearer ${userToken?.token}` },
  });

  const payload: APIResponse<PaginatedResponse<{ orders: Order[] }>> = await response.json();

  // Handle error
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
