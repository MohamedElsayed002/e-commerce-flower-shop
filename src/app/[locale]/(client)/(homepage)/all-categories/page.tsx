import { fetchProducts } from "@/lib/apis/product.api";
import { FilterStars } from "./_components/filter-stars";
import { ProductsCards } from "./_components/products-cards";
import { FilterStatus } from "./_components/filter-status";

type ProductsProps = {
  searchParams: SearchParams;
};

export default async function AllCategories({ searchParams }: ProductsProps) {

  // Fetch products based on search parameters
  let { rating = "", status = "" } = searchParams;
  rating = Array.isArray(rating) ? rating[0] : rating;
  status = Array.isArray(status) ? status : [status];

  const payload = await fetchProducts({ rating, status });

  return (
    <div className="min-h-screen grid  grid-cols-12">
      <div className="col-span-12 md:col-span-3">
        {/* Stars Filter */}
        <FilterStars />
        {/* Status Filter */}
        <FilterStatus />
      </div>
      <div className="col-span-12 md:col-span-9 p-4 text-7xl">
        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {payload?.products.map((item) => {
            return <ProductsCards item={item} />;
          })}
          {/* Check the length of Product */}
          {payload?.products.length === 0 && <h1>No Products To show</h1>}
        </div>
      </div>
    </div>
  );
}
