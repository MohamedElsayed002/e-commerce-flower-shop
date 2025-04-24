"use server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";

async function getAuthenticatedToken() {
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
// Stripe
export async function checkoutWithStripe(shippingAddress: ShippingAddress) {
  const token = await getAuthenticatedToken();
  console.log("ShippingAddress:", shippingAddress);

  const res = await fetch(
    `https://flower.elevateegy.com/api/v1/orders/checkout?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shippingAddress }),
    },
  );

  if ("error" in res) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create Stripe session");
  }

  const data = await res.json();
  if ("error" in data) {
    throw new Error(data.error);
  }
  return data.sessionUrl;
}

export async function createCashOrder(shippingAddress: ShippingAddress) {
  const token = await getAuthenticatedToken();

  const orderRes = await fetch(process.env.API + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      shippingAddress,
      paymentMethod: "cash",
    }),
  });

  if ("error" in orderRes) {
    const errorData = await orderRes.json();
    throw new Error(errorData.error || "Failed to create order");
  }

  return await orderRes.json();
}
