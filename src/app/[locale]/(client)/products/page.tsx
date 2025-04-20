import PriceFilter from "./_components/filters/price-filter";
import CategoryFilterWrapper from "./_components/category-filter-wrapper";
import OccasionFilterWrapper from "./_components/filters/occasion-flter-wrapper";

export default async function ProductPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <PriceFilter />
      <CategoryFilterWrapper />
      <OccasionFilterWrapper />
    </div>
  );
}
