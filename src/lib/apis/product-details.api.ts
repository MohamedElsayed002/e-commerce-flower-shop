
// Function to fetch product details from the API
export const fetchProductDetails = async (productid: string) => {
  try {
    // Send request to fetch product details
    const res = await fetch(process.env.API + `/products/${productid}`);

    // If the response is not successful, throw an error
    if (!res.ok) throw new Error("Product not found");

    // Parse the response JSON
    const data = await res.json();
    console.log('category',data)
    // fetchRelatedProducts(categoryId)
    return data;
  } catch (error) {
    // Return null in case of an error to indicate failure
    return null;
  }
};



// Handle GET requests for fetching products
export default async function fetchProductsByCategory(category: string) {
  const apiUrl = `${process.env.API}/products?category=${category}&limit=4`;
  const response = await fetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
  const payload = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload.products;
}


// Function to fetch related products from the API
// export const fetchRelatedProducts = async (categoryId: string) => {
//   try {
//     // Send request to fetch related products (limit to 4)
//     const apiUrl = `${process.env.API_BASE_URL}/products?category=${categoryId}`;
//     const res = await fetch(apiUrl);

//     // If the response is not successful, throw an error
//     if (!res.ok) throw new Error("Failed to fetch related products");

//     // Parse the response JSON
//     const data = await res.json();
//     console.log("related",data)
//     return data.data; // Assuming the products array is inside `data.data`
//   } catch (error) {
//     // Return null in case of an error
//     return null;
//   }
// };


//Fetch related products 
// export const fetchRelatedProducts = async (categoryId: string) => {
//   try {
//     // Send request to fetch product details
//     const res = await fetch(process.env.API + "/products");

//     // If the response is not successful, throw an error
//     if (!res.ok) throw new Error("Product not found");

//     // Parse the response JSON
//     const data = await res.json();
//     console.log(data)
//     return data;
//   } catch (error) {
//     // Return null in case of an error to indicate failure
//     return null;
//   }
// };




