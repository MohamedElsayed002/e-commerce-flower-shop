import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests for fetching products
export async function GET(req: NextRequest) {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category"); // Category filter
  const sort = searchParams.get("sort"); // Sort parameter

  // Construct the base API URL with query parameters
  const baseUrl = `${process.env.API}/products?${searchParams.toString()}`;

  try {
    // Fetch data from the API
    const response = await fetch(baseUrl, {
      next: { tags: ["products"] }, // Cache or revalidation options
      headers: { ...JSON_HEADER }, // Custom headers
    });

    // Handle unsuccessful responses
    if (!response.ok) {
      console.error(`Error fetching products: ${response.statusText}`);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: response.status });
    }

    // Parse the response data
    const data = await response.json();

    // Return the products data as a JSON response
    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    // Handle unexpected errors
    console.error(
      "Error fetching products:",
      error instanceof Error ? error.message : String(error),
    );
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
