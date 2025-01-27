import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BestSellerProducts from "./best-seller-products";
import React from "react";
import { getTranslations } from "next-intl/server";

export default async function BestSellerCarousel() {
  // Translation
  const t = await getTranslations();

  // Fetch the data server-side
  const response = await fetch(
    `http://localhost:3000/api/filtered-products?category=673c46fd1159920171827c85&sort=-sold`
  );
  const payload = await response.json();

  // Debugging: Log the fetched products
  console.log("Filtered Products", payload);

  return (
    <div className="best-seller-products w-[954px] overflow-hidden flex justify-center items-center">
      {/* Show a "Coming Soon" message if no products are available */}
      {payload.length === 0 ? (
        <div className="col-span-4 text-center text-xl font-semibold text-blue-gray-900">
          {t("coming-soon")}
        </div>
      ) : (
        // Carousel displaying the best seller products
        <Carousel
          opts={{
            loop: true,
            slidesToScroll: 1,
            align: "start",
          }}
          className="w-[954px] relative"
        >
          {/* Carousel Content */}
          <CarouselContent>
            {payload.map((product: Product, index: number) => (
              <BestSellerProducts product={product} key={index} />
            ))}
          </CarouselContent>

          {/* Carousel Navigation */}
          <CarouselPrevious className="text-white left-[0.1rem] top-[8.5rem] border-0 bg-custom-rose-900 hover:bg-custom-rose-800" />
          <CarouselNext className="text-white right-[0.45rem] top-[8.5rem] border-0 bg-custom-rose-900 hover:bg-custom-rose-800" />
        </Carousel>
      )}
    </div>
  );
}
