import { fetchCategories } from "@/lib/apis/category.api";
import CategoryFilter from "./filters/category-filter";

export default async function CategoryFilterWrapper() {
  const categoriesData = await fetchCategories();
  return <CategoryFilter categories={categoriesData?.categories ?? []} />;
}
