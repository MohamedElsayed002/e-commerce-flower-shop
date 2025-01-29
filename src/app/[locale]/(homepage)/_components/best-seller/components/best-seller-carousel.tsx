import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/custom/product-card-component";

export default async function BestSellerCarousel() {
  // Translation
  const t = await getTranslations();

  const response = await fetch(
    `${process.env.NEXT_BASE_URL}/filtered-products?category=673c46fd1159920171827c85&sort=-sold`
  );
  const payload = await response.json();

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
          {/* Carousel content */}
          <CarouselContent>
            {payload.map((product: Product, index: number) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <ProductCard product={product} key={index} />
                </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel navigation */}
          <CarouselPrevious className="text-white left-[0.1rem] top-[8.5rem] border-0 bg-custom-rose-900 hover:bg-custom-rose-800" />
          <CarouselNext className="text-white right-[0.45rem] top-[8.5rem] border-0 bg-custom-rose-900 hover:bg-custom-rose-800" />
        </Carousel>
      )}
    </div>
  );
}
