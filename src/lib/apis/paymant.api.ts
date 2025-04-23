"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "@/lib/constants/auth.constant";

type ShippingAddress = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
};

export async function checkoutWithStripe(shippingAddress: ShippingAddress) {
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

  console.log("Token:", token.token);
  const res = await fetch(
    `https://flower.elevateegy.com/api/v1/orders/checkout?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({ shippingAddress }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to create Stripe checkout session");
  }

  const data = await res.json();
  console.log("Stripe session URL:", data);
  return data.sessionUrl;
}

// This function is used to place a cash order
export async function CashOrder(shippingAddress: ShippingAddress) {
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

  const res = await fetch(`${process.env.API}/orders`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token.token}`,
    // },
    body: JSON.stringify({ shippingAddress }),
  });

  if (!res.ok) {
    throw new Error("Failed to place cash order");
  }

  console.log("Cash order response:", res);
  console.log("Cash order response status:", res.status);
  return await res.json();
}
