"use server";

import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Add proucts function
export async function addProducts(formData: FormData) {
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  const apiUrl = `${process.env.API}/products`;

  const response = await fetch(apiUrl, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
    body: formData,
  });

  const payload: APIResponse<ProductcreationResponse> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }
  revalidatePath("/dashboard/products");
  return payload;
}

// Get product by id
export async function getProductById(id: string): Promise<Product> {
  const token = await getAuthenticatedToken();

  const res = await fetch(`${process.env.API}/products/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload: APIResponse<{ product: Product }> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.product;
}

// Update products function
export async function updateProduct(id: string, formData: FormData) {
   const token = await getAuthenticatedToken();

  const response = await fetch(`${process.env.API}/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  revalidatePath("/products");
}
function getAuthenticatedToken() {
  throw new Error("Function not implemented.");
}

