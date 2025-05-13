"use server";

import { cookies } from "next/headers";
import { JSON_HEADER } from "../constants/api.constant";
import { decode } from "next-auth/jwt";
import { getTranslations } from "next-intl/server";

export async function updateOccasionsAction(fields: OccasionFields, occasionId: string) {
  // Translation
  const t = await getTranslations();

  // Get toke from cookies and decode it
  const token = cookies().get("next-auth.session-token")?.value;

  // Throw error if the user did not login
  if (!token) throw new Error("Authentication token is missing. Please login");

  const adminToken = await decode({ secret: process.env.NEXTAUTH_SECRET!, token });

  const response = await fetch(`${process.env.API}/occasions/${occasionId}`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${adminToken?.token}`,
    },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<OccasionResponse> = await response.json();

  return payload;
}
