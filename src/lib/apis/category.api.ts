export async function categoriesWrapper() {
  const response = await fetch(process.env.API + "/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return data;
}
