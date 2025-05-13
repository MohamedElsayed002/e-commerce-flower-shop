export async function fetchOccasions() {
  try {
    const response = await fetch(`${process.env.API}/occasions`, {
      cache: "no-store",
    });

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
export default async function fetchOccasionById(id: string): Promise<Occasions> {
  const response = await fetch(`${process.env.API}/occasions/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const payload: {
    message: string;
    occasion: Occasions;
  } = await response.json();

  return payload.occasion;
}
