import ProductCard from "@/components/features/product/product-card-component";
import { searchParamsToString } from "@/lib/utils/convert-search-params";
import { getTranslations } from "next-intl/server";

async function fetchProducts(searchParams: SearchParams) {
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

export default async function Products({ searchParams }: { searchParams: SearchParams }) {
  // Translation
  const t = await getTranslations();

  // Variables
  const payload = await fetchProducts(searchParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {payload.products.map((product) => {
        return <ProductCard width="400" height="400" key={product._id} product={product} />;
      })}
      {payload.products.length === 0 && <h1>{t("no-products-available-1")}</h1>}
    </div>
  );
}
