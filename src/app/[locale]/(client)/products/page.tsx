import { fetchOccasions } from "@/lib/apis/occasion-api";
import OccasionFilter from "./_components/filters/occasion-filter";
import { fetchCategories } from "@/lib/apis/category.api";
import CategoryFilter from "./_components/filters/categoty-filter";
import PriceFilter from "./_components/filters/price-filter";

export default async function ProductPage() {
  const occasionsData = await fetchOccasions();
  const categoriesData = await fetchCategories();

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <OccasionFilter occasions={occasionsData?.occasions ?? []} />
      <CategoryFilter categories={categoriesData?.categories ?? []} />
      <PriceFilter />
    </div>
  );
}
