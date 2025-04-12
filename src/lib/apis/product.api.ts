import { getTranslations } from "next-intl/server";

// Function to fetch product details from the API
export const fetchProductDetails = async (productid: string) => {
  // Translations
  const t = await getTranslations();

  try {
    // Send request to fetch product details
    const response = await fetch(process.env.API + `/products/${productid}`);

    // If the response is not successful, throw an error
    if (!response.ok) throw new Error(t("product-not-found"));

    // Parse the response JSON
    const data: APIResponse<PaginatedResponse<{ product: Product }>> = await response.json();

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
  const payload: APIResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

  // Handle error
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload.products;
}
