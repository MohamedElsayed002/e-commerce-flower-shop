import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/features/product/product-card-component";

async function fetchProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/filtered-products?category=673c46fd1159920171827c85&sort=-sold`,
    );
    const payload: APIResponse<Product[]> = await response.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return null;
  }
}

export default async function BestSellerCarousel() {
  // Translation
  const t = await getTranslations();

  // Variables
  const products = (await fetchProducts()) || [];

  return (
    <div className="overflow-hidden flex justify-center items-center col-span-3">
      {/* Show a "Coming Soon" message if no products are available */}
      {products.length === 0 ? (
        <div className="col-span-4 min-h-80 text-center text-xl font-semibold text-blue-gray-900">
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
          className="w-full relative"
        >
          {/* Carousel content */}
          <CarouselContent>
            {products.map((product: Product, index: number) => (
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
