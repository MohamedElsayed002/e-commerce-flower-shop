"use server";

import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function deleteProduct(productId: string) {
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  const apiUrl = `${process.env.API}/products/${productId}`;

  const response = await fetch(apiUrl, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
  });

  const payload: APIResponse<ProductDashboardResponse> = await response.json();

  console.log("Response from deleteProduct:", payload);

  return payload;
}
