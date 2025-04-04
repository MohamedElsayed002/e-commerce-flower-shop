// Function to fetch product details from the API
export const fetchProductDetails = async (productid: string) => {
  try {
    // Send request to fetch product details
    const res = await fetch(process.env.API + `/products/${productid}`);

    // If the response is not successful, throw an error
    if (!res.ok) throw new Error("Product not found");

    // Parse the response JSON
    const data = await res.json();

    // fetchRelatedProducts(categoryId)
    return data;
  } catch (error) {
    // Return null in case of an error to indicate failure
    return null;
  }
};

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
