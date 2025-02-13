import TestimonialSection from "./_components/testimonials";
import GallerySection from "./_components/gallery";
import CompaniesSection from "./_components/partner-companies";
import { fetchCategories } from "@/lib/apis/category.api";
import Categories from "./_components/categories";

export default async function Home() {
  // Variables
  const payload = await fetchCategories();

  return (
    <>
      <Categories categories={payload?.categories || []} />
      <GallerySection />
      <TestimonialSection />
      <CompaniesSection />
    </>
  );
}
