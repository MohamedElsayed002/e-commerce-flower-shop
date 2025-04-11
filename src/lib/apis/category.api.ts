"use server";

export async function fetchCategories() {
  try {
    const response = await fetch(`${process.env.API}/categories`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const payload: APIResponse<PaginatedResponse<{ categories: Category[] }>> =
      await response.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return null;
  }
}
