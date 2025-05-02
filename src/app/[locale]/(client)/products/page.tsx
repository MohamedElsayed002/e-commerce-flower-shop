import { Suspense } from "react";
import Products from "./_components/all-products";
import AllProductsSkeleton from "./_components/all-products-skeleton";
import { FilterStatus } from "./_components/filters/filter-status";
import { FilterStars } from "./_components/filters/filter-stars";
import PriceFilter from "./_components/filters/price-filter";
import CategoryFilterWrapper from "./_components/category-filter-wrapper";
import OccasionFilterWrapper from "./_components/filters/occasion-flter-wrapper";

export default async function AllCategoriesPage({ searchParams }: RouteProps) {
  return (
    <div className="p-10 grid grid-cols-1 gap-5 md:grid-cols-[1fr_4fr] container">
      
      {/* Status Filter */}
      <div>
        <CategoryFilterWrapper />
        <OccasionFilterWrapper />
        <PriceFilter />
        <FilterStatus />
        <FilterStars />
      </div>

      {/* Products */}
      <Suspense fallback={<AllProductsSkeleton />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
