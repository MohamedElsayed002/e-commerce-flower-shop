import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/features/product/product-card-component";
import React from "react";

type PopularItemsGridProps = {
  categoryId: string;
};

async function fetchProducts(categoryId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/filtered-products?category=${categoryId}&sort=-sold`,
    );
    const payload: APIResponse<Product[]> = await response.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return null;
  }
}

export default async function PopularItemsGrid({ categoryId }: PopularItemsGridProps) {
  // Translation
  const t = await getTranslations();

  const products = (await fetchProducts(categoryId)) || [];

  return (
    <div className="grid grid-cols-4 gap-6 justify-start">
      {/* Show a "Coming Soon" message if no products are available */}
      {products.length === 0 ? (
        <div className="col-span-4 min-h-80 flex items-center justify-center text-center text-xl font-semibold text-blue-gray-900">
          {t("coming-soon")}
        </div>
      ) : (
        // Grid displaying the popular products
        products.map((product: Product, index: number) => (
          <ProductCard product={product} key={index} />
        ))
      )}
    </div>
  );
}
