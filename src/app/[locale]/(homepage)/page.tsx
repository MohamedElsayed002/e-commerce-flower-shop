import AboutUs from "./_components/about-us";
import BestSeller from "./_components/best-seller";
import PopularProducts from "./_components/popular-products";

export default function Home() {
  return (
<div className="container mx-auto my-20">
  {/* Best Seller */}
  <BestSeller />
  {/* Popular Products */}
  <PopularProducts />
  {/* About Us */}
  <AboutUs />
</div>
  );
}
