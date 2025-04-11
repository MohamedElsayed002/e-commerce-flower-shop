export async function fetchOccasions() {
  try {
    const response = await fetch(`${process.env.API}/occasions`, {
      cache: "no-store",
    });
    console.log("Fetching from:", `${process.env.API}/occasions`);
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch occasions: ${response.status}`);
    }

    const payload: APIResponse<PaginatedResponse<{ occasions: Occasion[] }>> =
      await response.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload.occasions;
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return [];
  }
}
