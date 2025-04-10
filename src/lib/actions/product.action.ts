"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "../constants/auth.constant";
import { getTranslations } from "next-intl/server";

// Add to cart function
export const addProductToCart = async (productid: string, quantity: number) => {
  // Translations
  const t = await getTranslations();

  // Retrieve the token from cookies
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;

  // Retrieve the token from cookies
  if (!tokenCookies) {
    return { success: false, message: t("you-must-be-logged-in-to-add-items-to-the-cart") };
  }

  // Handling when happen any fail in decoded
  let token;
  try {
    token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

    if (!token) {
      return { success: false, message: t("invalid-or-expired-token") };
    }
  } catch (error) {
    return { success: false, message: t("invalid-or-expired-token") };
  }

  try {
    // Fetch api
    const response = await fetch(process.env.API + "/cart", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token?.token}`,
      }),

      body: JSON.stringify({
        product: productid,
        quantity: quantity,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data?.error || t("failed-to-add-product"),
      };
    }

    // Parse the response JSON from the API
    const data: APIResponse<PaginatedResponse<{ product: Product[] }>> = await response.json();

    // If successful, return a success message
    return {
      data,
      success: true,
      quantity,
      message: t("product-added-to-cart-successfully", { count: quantity }),
    };
  } catch (error) {
    // Catch any errors during the API call and return an error message
    return { success: false, message: t("an-error-occurred-while-adding-the-product") };
  }
};
