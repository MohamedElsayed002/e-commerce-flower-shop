import { searchParamsToString } from "../utils/convert-search-params";

export async function fetchProducts(searchParams: SearchParams) {
  const response = await fetch(
    `${process.env.API}/products?${searchParamsToString(searchParams)}`,
    {
      cache: "no-cache",
    },
  );

  const payload: APIResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

  if ("error" in payload || !response.ok) {
    if ("error" in payload) {
      throw new Error(payload.error);
    }
    throw new Error("Failed to fetch Products");
  }
  return payload;
}
