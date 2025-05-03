"use server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
import { getTranslations } from "next-intl/server";

async function getAuthenticatedToken() {
  // Translation
  const t = await getTranslations();

  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;
  if (!tokenCookie) {
    throw new Error("Authentication required");
  }

  const token = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  return token.token;
}
// checkoutWithStripe

export async function checkoutWithStripe(shippingAddress: ShippingAddress): Promise<string> {
  const token = await getAuthenticatedToken();

  const res = await fetch(
    `https://flower.elevateegy.com/api/v1/orders/checkout?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        shippingAddress,
      }),
    },
  );

  if ("error" in res) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create order");
  }
  const data = await res.json();
  console.log("Backend response:", data);

  if (!data?.session?.url) {
    throw new Error("Payment gateway URL not provided by server");
  }
  return data.session.url as string;
}
// CashOrder
export async function createCashOrder(shippingAddress: ShippingAddress) {
  const token = await getAuthenticatedToken();

  const res = await fetch(process.env.API + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({
      shippingAddress,
    }),
  });

  if ("error" in res) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create order");
  }

  return await res.json();
}
