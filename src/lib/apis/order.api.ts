"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";

// fetch Cart Order
export async function fetchOrders() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;

  if (!tokenCookie) {
    throw new Error("Authentication required");
  }

  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  const response = await fetch(process.env.API + "/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  const data: APIResponse<PaginatedResponse<{ cart: Cart[] }>> = await response.json();
  if ("error" in data) {
    throw new Error(data.error);
  }
  return data;
}

// fetchLatestOrder

export async function fetchLatestOrder() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;

  if (!tokenCookie) {
    throw new Error("Authentication required");
  }

  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  const response = await fetch(process.env.API + `/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  const payload: APIResponse<PaginatedResponse<{ orders: Order[] }>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.orders[payload.orders.length - 1];
}
