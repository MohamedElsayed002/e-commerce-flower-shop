import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextResponse } from "next/server";

// Handle GET requests to fetch categories
export async function GET(request: Request) {
  // Parse the request URL to extract query parameters
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category"); // Get the "category" query parameter

  // Construct the base API URL for categories
  const baseUrl = new URL(`${process.env.API_BASE_URL}/categories`);

  try {
    // Add the "category" query parameter to the API URL if provided
    if (categoryId) {
      baseUrl.searchParams.set("category", categoryId);
    }

    // Fetch the categories from the API
    const response = await fetch(baseUrl.toString(), {
      next: { tags: ["categories"] }, // Cache or revalidation options
      headers: { ...JSON_HEADER }, // Include custom headers
    });

    // Parse the response payload
    const payload = await response.json();

    // Extract the first 4 categories from the response or return an empty array if not available
    const categories = payload?.categories?.slice(0, 4) || [];

    // Return the extracted categories as a JSON response
    return NextResponse.json({ categories }, { status: response.status });
  } catch (error) {
    // Handle unexpected errors and return a 500 status with error details
    console.error(`Error fetching categories: ${error}`);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching categories" },
      { status: 500 }
    );
  }
}
