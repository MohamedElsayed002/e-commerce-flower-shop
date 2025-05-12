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
// addcategory

export async function addcategory(formData: FormData) {
  const token = await getAuthenticatedToken();
  console.log("token", token);

  const response = await fetch(`https://flower.elevateegy.com/api/v1/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: formData,
  });

  const payload = await response.json();
  console.log("payload", payload);
}
