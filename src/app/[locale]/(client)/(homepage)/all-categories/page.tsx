"use client";

import { useProductCategory } from "@/hooks/filters-hook/use-category";
import ProductCard from "@/components/features/product/product-card-component";
import ProductSkeleton from "@/components/skeletons/product/product.skeleton";
import { useTranslations } from "next-intl";

type ProductsProps = {
  searchParams: {
    rating?: string;
    status?: string | string[];
  };
};

export default function AllCategoriesPage({ searchParams }: ProductsProps) {
  // Translation
  const t = useTranslations();

  let { rating = "", status = "" } = searchParams;
  rating = Array.isArray(rating) ? rating[0] : rating;
  status = Array.isArray(status) ? status : [status];

  // Mutation
  const { data, isLoading, error } = useProductCategory({ rating, status });

  // Loading
  if (isLoading) {
    return (
      <div className="p-20 w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  // Error 
  if (error) return <div>{t("error-loading-products")}</div>;

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Status Filter */}
      <div className="col-span-12 md:col-span-3"></div>

      <div className="col-span-12 md:col-span-9 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Products */}
          {data?.products.map((item) => {
            return <ProductCard width="400" height="400" key={item._id} product={item} />;
          })}

          {/* Message if no products */}
          {data?.products.length === 0 && <h1>{t("no-products-available-0")}</h1>}

        </div>
      </div>
    </div>
  );
}
