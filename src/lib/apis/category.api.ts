export async function fetchCategories() {
  try {
    const response = await fetch(process.env.API + "/categories");

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
