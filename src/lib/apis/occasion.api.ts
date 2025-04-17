"use server";
export async function fetchOccasions() {
  try {
    const response = await fetch(`${process.env.API}/occasions`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch occasions: ${response.status}`);
    }

    const payload: APIResponse<PaginatedResponse<{ occasions: Occasion[] }>> =
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
