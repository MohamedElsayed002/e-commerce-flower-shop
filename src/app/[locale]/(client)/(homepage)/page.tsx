import { fetchCategories } from "@/lib/apis/category.api";
import AboutUs from "./_components/about-us";
import BestSeller from "./_components/best-seller";
import Categories from "./_components/categories";
import PopularItems from "./_components/popular-items";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  // Variables
  const payload = await fetchCategories();

  return (
    <div className="container custom-x mx-auto my-20">
      {/* Categories */}
      <Categories categories={payload?.categories || []} />

      {/* Best Seller */}
      <BestSeller />

      {/* Popular Items */}
      <PopularItems searchParams={searchParams} categories={payload?.categories || []} />

      {/* About Us */}
      <AboutUs />

      {/* Other components */}
    </div>
  );
}
