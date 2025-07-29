"use server";

import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { revalidatePath } from "next/cache";

export async function deleteCategory({ categoryId }: { categoryId: string }) {

  // Get token
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  const response = await fetch(`${process.env.API}/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
  });
  const payload = await response.json();
  revalidatePath("/dashboard/categories");

  return payload;
}
