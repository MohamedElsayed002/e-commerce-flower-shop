"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";

export async function fetchOrders() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;

  if (!tokenCookie) {
    throw new Error("Authentication required");
  }

  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  const response = await fetch(process.env.API + "/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }

  return await response.json();
}
