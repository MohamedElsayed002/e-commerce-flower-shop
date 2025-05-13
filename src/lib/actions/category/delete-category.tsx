"use server"

import { AUTH_COOKIE } from "@/lib/constants/auth.constant";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";


export async function deleteCategory({ categoryId }: { categoryId: string }) {

  // Get token
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });
    const tokenCookie = cookies().get(AUTH_COOKIE)?.value;
  console.log("token",token?.token)
  
  const response = await fetch(`${process.env.API}/categories/${categoryId}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
       Authorization: `Bearer ${token?.token}` },
  });
  console.log("response",response)
  const payload = await response.json();
  console.log("payload",payload)
//   revalidateTag("getCart");

  return payload;
}
