// import { fetchCategories } from "@/lib/apis/category.api";
// import CategoryFilter from "./_components/filters/categoty-filter";

// export default async function ProductPage() {
//   const categoriesData = await fetchCategories();

//   if (!categoriesData) {
//     return <p>Error loading filters.</p>;
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Filters */}
//       <CategoryFilter categories={categoriesData.categories} />
//     </div>
//   );
// }
import { fetchCategories } from "@/lib/apis/category.api";
import CategoryFilter from "./_components/filters/categoty-filter";

export default async function ProductPage() {
  try {
    const categoriesData = await fetchCategories();

    if (!categoriesData || !categoriesData.categories) {
      throw new Error("No categories data received");
    }

    return (
      <div className="p-6 space-y-6">
        <CategoryFilter categories={categoriesData.categories} />
      </div>
    );
  } catch (error) {
    console.error("Error in ProductPage:", error);
    return (
      <div className="p-6">
        <p className="text-red-500">Failed to load categories. Please try again later.</p>
      </div>
    );
  }
}
