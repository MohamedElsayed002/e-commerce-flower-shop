import AboutUs from "./_components/about-us";
import BestSeller from "./_components/best-seller";
import PopularItems from "./_components/popular-items";
import CategorySkeleton from "@/components/skeletons/product-category/category.skeleton";
import ProductSkeleton from "@/components/skeletons/product/product.skeleton";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="container custom-x mx-auto my-20">
      {/* Best Seller */}
      <BestSeller />

      {/* Popular Items */}
      <PopularItems searchParams={searchParams} />

      {/* About Us */}
      <AboutUs />
      <ProductSkeleton />
      <CategorySkeleton />

      {/* Other components */}
    </div>
  );
}
