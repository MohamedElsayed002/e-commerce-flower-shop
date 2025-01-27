import AboutUs from "./_components/about-us";
import BestSeller from "./_components/best-seller";
import PopularItems from "./_components/popular-items";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  console.log("Search params", searchParams); 

  return (
    <div className="container custom-x mx-auto my-20">
      {/* Best Seller */}
      <BestSeller />

      {/* <PopularItems /> */}
      <PopularItems searchParams={searchParams} />

      {/* Other components */}
      <AboutUs />

    </div>
  );
}
