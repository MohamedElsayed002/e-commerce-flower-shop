import AboutUs from "./_components/about-us";
import BestSeller from "./_components/best-seller";
import PopularItems from "./_components/popular-items";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
      <div className="container custom-x mx-auto my-20">
        {/* Best Seller */}
        <BestSeller />

        {/* Popular Items */}
        <PopularItems searchParams={searchParams} />

        {/* About Us */}
        <AboutUs />

        {/* Other components */}

      </div>
    );
}
