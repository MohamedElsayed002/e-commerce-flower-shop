"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function editProfileAction(fields: ProfileFields) {
  const tokenCookies = cookies().get("next-auth.session-token")?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  const apiUrl = `${process.env.API}/auth/editProfile`;

  const response = await fetch(apiUrl, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<ProfileResponse> = await response.json();

  return payload;
}
