import { fetchCategories } from "@/lib/apis/category.api";
import CategoryFilter from "./_components/filters/categoty-filter";
import { fetchOccasions } from "@/lib/apis/occasion-api";
import OccasionFilter from "./_components/filters/occasion-filter";
import PriceFilter from "./_components/filters/price-filter";

export default async function ProductPage() {
  const categoriesData = await fetchCategories();
  const occasionsData = await fetchOccasions();

  if (!categoriesData || !occasionsData) {
    return <p>Error loading filters.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <CategoryFilter categories={categoriesData.categories} />
      <OccasionFilter occasions={occasionsData.occasions} />
      <PriceFilter />
      {/* Render product list here */}
    </div>
  );
}
