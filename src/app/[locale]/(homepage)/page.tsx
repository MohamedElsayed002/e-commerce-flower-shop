import AboutUs from "./_components/about-us";
import BestSeller from "./_components/best-seller";

export default function Home() {
  return (
<div className="container mx-auto my-20">
  {/* Best Seller */}
  <BestSeller />
  {/* Popular Products */}
  
  {/* About Us */}
  <AboutUs />
</div>
  );
}
