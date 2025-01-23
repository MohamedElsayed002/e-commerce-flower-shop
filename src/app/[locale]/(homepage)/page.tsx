import AboutUsComponent from "./_components/about-us";
import BestSellerComponent from "./_components/best-seller";
import PopularProductsComponent from "./_components/popular-products";

export default function Home() {
  return (
    <div className="container mx-auto my-20">
      {/* Best Seller */}
      <BestSellerComponent />
      {/* Popular Products */}
      <PopularProductsComponent />
      {/* About Us */}
      <AboutUsComponent />
    </div>
  );
}
