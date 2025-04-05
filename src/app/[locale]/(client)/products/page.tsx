import { fetchCategories } from "@/lib/apis/category.api";
import CategoryFilter from "./_components/filters/categoty-filter";

export default async function ProductPage() {
  const categoriesData = await fetchCategories();

  if (!categoriesData) {
    return <p>Error loading filters.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <CategoryFilter categories={categoriesData.categories} />
    </div>
  );
}
