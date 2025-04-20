import { Suspense } from "react";
import Products from "./_components/all-products";
import AllProductsSkeleton from "./_components/all-products-skeleton";
import { FilterStatus } from "./_components/filters/filter-status";

export default async function AllCategoriesPage({ searchParams }: RouteProps) {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-5 container">
      {/* Status Filter */}
      <div>
        <FilterStatus/>
      </div>

      {/* Products */}
      <Suspense fallback={<AllProductsSkeleton />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </div>
  );
}