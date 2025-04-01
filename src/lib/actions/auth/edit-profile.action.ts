"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function editProfileAction(fields: ProfileFields) {
  const cookieStore = cookies();
  const token = await getToken({ req: { cookies: cookieStore } });

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
