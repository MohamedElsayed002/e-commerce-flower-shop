// Handle related items function
export default async function fetchProductsByCategory(category: string) {
  // Fetch api
  const apiUrl = `${process.env.API}/products?category=${category}&limit=4`;
  const response = await fetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });

  // Parse the JSON response
  const payload = await response.json();

  // Handle error
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload.products;
}
