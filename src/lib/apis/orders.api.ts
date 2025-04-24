import { JSON_HEADER } from "@/lib/constants/api.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchOrders() {
  // Get the token from cookies
  const token = cookies().get("next-auth.session-token")?.value;

  // Get the secret key used to decode the JWT
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) throw new Error("NEXTAUTH_SECRET is not defined");

  // If there's no token, redirect to home
  if (!token) {
    redirect("/");
  }

  // Decode the session token to extract user information
  const userToken = await decode({ secret, token });

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
