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


