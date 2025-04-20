export async function fetchCategories() {
  try {
<<<<<<< HEAD
    const response = await fetch(`${process.env.API}/categories`, {
      method: "GET",
      cache: "no-store",
    });
=======
    const response = await fetch(process.env.API + "/categories");
>>>>>>> 68a573d564b2aafec59cb3ee52b193efc4fed6e2

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
