"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { AUTH_COOKIE } from "../constants/auth.constant";
import { getTranslations } from "next-intl/server";

//Add to cart function
export const addProductToCart = async (productid: string, quantity: number) => {
   // Translations
   const t = await getTranslations();
  // Retrieve the token from cookies
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;

  // Retrieve the token from cookies
  if (!tokenCookies) {
    return { success: false, message: 'you-must-be-logged-in-to-add-items-to-the-cart' };
  }

  // Decode the JWT token to extract the payload (user details)
  const token = await decode({ token: tokenCookies, secret: process.env.AUTH_SECRET! });

  try {
    //Fetch api
    const res = await fetch(process.env.API + "/cart", {
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
    console.log("sent",quantity)

    // Parse the response JSON from the API
    const data = await res.json();
    console.log('cart',data)

    // If the response is not ok, return an error message
    if (!res.ok) {
      return { success: false, message: data.error || "Failed to add product" };
    }

    // If successful, return a success message
    return { success: true, message: "Product added to cart successfully!" };
  } catch (error) {
    // Catch any errors during the API call and return an error message
    return { success: false, message: "An error occurred while adding the product." };
  }
};
