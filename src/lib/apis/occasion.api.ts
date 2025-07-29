import { getTranslations } from "next-intl/server";
import { searchParamsToString } from "../utils/convert-search-params";

export async function fetchOccasions(searchParams: SearchParams) {
  try {
    const response = await fetch(
      `${process.env.API}/occasions?${searchParamsToString(searchParams)}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch occasions: ${response.status}`);
    }

    const payload: APIResponse<PaginatedResponse<{ occasions: Occasions[] }>> =
      await response.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return null;
  }
}

// Function to fetch a single occasion by id
export default async function fetchOccasionById(id: string) {
  // Translation
  const t = await getTranslations();

  const response = await fetch(`${process.env.API}/occasions/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(t("failed-to-fetch-occasion-with-id") + `${response.status}`);
  }

  const payload: { occasion: Occasions } = await response.json();

  return payload.occasion;
}
