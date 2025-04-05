import { fetchProducts } from "@/lib/apis/product.api";
import { ProductsCards } from "./_components/products-card";
import { getTranslations } from 'next-intl/server';

type ProductsProps = {
  searchParams: SearchParams;
};

export default async function AllCategoriesPage({ searchParams }: ProductsProps) {

  // Translation
  const t = await getTranslations();

  // Fetch Products based on search parameters
  let { rating = "", status = "" } = searchParams;
  rating = Array.isArray(rating) ? rating[0] : rating;
  status = Array.isArray(status) ? status : [status];

  const payload = await fetchProducts({ rating, status });
  
  return (
    <div className="min-h-screen grid  grid-cols-12">
      {/* Status Filter */}
      <div className="col-span-12 md:col-span-3"></div>
      <div className="col-span-12 md:col-span-9 p-4 text-7xl">
        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {payload?.products.map((item) => {
            return <ProductsCards key={item._id} item={item} />;
          })}
          {/* Check the length of Product */}
          {payload?.products.length === 0 && <h1>{t("no-products-to-show")}</h1>}
        </div>
      </div>
    </div>
  );
}
