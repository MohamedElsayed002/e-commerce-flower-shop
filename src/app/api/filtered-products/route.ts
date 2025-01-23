import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  const baseUrl = `${process.env.API_BASE_URL}/products?category=${category}&sort=${sort}`;

  try {
    const response = await fetch(baseUrl, {
      next: { tags: ["products"] },
      headers: {
        ...JSON_HEADER,
      },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch products", { status: response.status });
    }

    const payload: APIResponse<{ products: Product[] }> = await response.json();

    if (payload.message === "success" && "products" in payload) {
      return NextResponse.json(payload.products);
    }

    return new NextResponse(
      JSON.stringify({ error: payload.message || "Unexpected error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Server error", details: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
