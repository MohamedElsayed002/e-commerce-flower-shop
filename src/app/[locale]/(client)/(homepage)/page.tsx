/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchCategories } from "@/lib/apis/category.api";
import AboutUs from "./_components/about-us";
import BestSeller from "./_components/best-seller";
import Categories from "./_components/categories";
import PopularItems from "./_components/popular-items";
import GallerySection from "./_components/gallery";
import TestimonialSection from "./_components/testimonials";
import CompaniesSection from "./_components/partner-companies";
import { Toaster } from "@/components/ui/sonner";
import VerifyOtpForm from "@/components/features/auth/components/verify-otp-form";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  // Variables
  const payload = await fetchCategories();

  const email: string = "mariemmohamed1421@gmail.com" 

  return (
    <main className="w-full">
      <Toaster />
      <VerifyOtpForm email={email} />
      {/* Categories */}
      <Categories categories={payload?.categories || []} />

      {/* Best Seller */}
      <BestSeller />

      {/* Popular Items */}
      <PopularItems searchParams={searchParams} categories={payload?.categories || []} />

      {/* About Us */}
      <AboutUs />

      {/* Gallery */}
      <GallerySection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Companies */}
      <CompaniesSection />
    </main>
  );
}
