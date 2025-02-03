import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/features/product/product-card-component";
import React from "react";

type PopularItemsGridProps = {
  categoryId: string;
};

export default async function PopularItemsGrid({ categoryId }: PopularItemsGridProps) {
  // Translation
  const t = await getTranslations();

  const response = await fetch(
    `${process.env.NEXT_BASE_URL}/filtered-products?category=${categoryId}&sort=-sold`
  );
  const payload: Product[] = await response.json();

  return (
    <div className="grid grid-cols-4 gap-6 justify-start">
      {/* Show a "Coming Soon" message if no products are available */}
      {payload.length === 0 ? (
        <div className="col-span-4 min-h-80 flex items-center justify-center text-center text-xl font-semibold text-blue-gray-900">
          {t("coming-soon")}
        </div>
      ) : (
        // Grid displaying the popular products
        payload.map((product: Product, index: number) => (
          <ProductCard product={product} key={index} />
        ))
      )}
    </div>
  );
}
