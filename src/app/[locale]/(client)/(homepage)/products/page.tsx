import { Suspense } from "react";
import Products from "./_components/all-products";
import AllProductsSkeleton from "./_components/all-products-skeleton";

export default async function AllCategoriesPage({ searchParams }: RouteProps) {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-[1fr_4fr] container">
      {/* Status Filter */}
      <div></div>

      {/* Products */}
      <Suspense fallback={<AllProductsSkeleton />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
