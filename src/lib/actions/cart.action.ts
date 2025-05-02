"use server";

import { cookies } from "next/headers";
import { JSON_HEADER } from "../constants/api.constant";
import { AUTH_COOKIE } from "../constants/auth.constant";
import { decode } from "next-auth/jwt";
import { getTranslations } from "next-intl/server";
import getToken from "../utils/get-token";
import { revalidateTag } from "next/cache";

// Add to cart action
export async function addToCartAction(fields: CartFields) {
  // Translation
  const t = await getTranslations();

  // Get toke from cookies and decode it
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  // Throw error if the user did not login
  if (!tokenCookies) throw new Error(t("please-login-first"));

  const response = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<CartResponse> = await response.json();

  return payload;
}

// Update cart quantity action
export async function updateQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  // Get token
  const token = await getToken();

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: { ...JSON_HEADER, Authorization: "Bearer " + token },
    body: JSON.stringify({ quantity }),
  });

  const payload = await response.json();
  revalidateTag("getCart");
  return payload;
}

export async function removeCartItem({ productId }: { productId: string }) {
  // Get token
  const token = await getToken();

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "DELETE",
    headers: { ...JSON_HEADER, Authorization: "Bearer " + token },
  });

  const payload = await response.json();
  revalidateTag("getCart");

  return payload;
}
