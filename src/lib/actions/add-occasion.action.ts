"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getTranslations } from "next-intl/server";

export async function addOccasionsAction(formData: FormData) {
  // Translation
  const t = await getTranslations();

  // Get toke from cookies and decode it
  const token = cookies().get("next-auth.session-token")?.value;

  // Throw error if the user did not login
  if (!token) throw new Error(t("authentication-token-is-missing-please-login"));

  const adminToken = await decode({ secret: process.env.NEXTAUTH_SECRET!, token });

  const response = await fetch(`${process.env.API}/occasions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${adminToken?.token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorPayload = await response.json();
    throw new Error(errorPayload?.error || t("failed-to-fetch-add-occasion"));
  }
  const payload = await response.json();

  return payload;
}
