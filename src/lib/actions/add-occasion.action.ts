"use server";

import { cookies } from "next/headers";
import { JSON_HEADER } from "../constants/api.constant";
import { decode } from "next-auth/jwt";
import { getTranslations } from "next-intl/server";

export async function addOccasionsAction(formData: FormData) {
  // Translation
  const t = await getTranslations();

  // Get toke from cookies and decode it
  const token = cookies().get("next-auth.session-token")?.value;

  // Throw error if the user did not login
  if (!token) throw new Error("Authentication token is missing. Please login");

  const adminToken = await decode({ secret: process.env.NEXTAUTH_SECRET!, token });

  const response = await fetch(`${process.env.API}/occasions`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${adminToken?.token}`,
    },
    body: formData,
  });

  const payload = await response.json();
  return payload;
}
