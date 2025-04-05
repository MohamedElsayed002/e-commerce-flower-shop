"use client";

import * as React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type productsPropes = {
  products: Product[];
};

export default function ProductCarousel({ products }: productsPropes) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* Main Carousel */}
      <div className="relative rounded-lg overflow-hidden border border-gray-200 mb-4">
        <Carousel
          className="w-full"
          onSelect={(index) => setCurrentIndex(index)}
          selectedIndex={currentIndex}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product._id}>
                <div className="relative aspect-square">
                  <Image src={product.imgCover} alt={product.title} fill className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-4 gap-2">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden border-2",
              currentIndex === index ? "border-pink-300" : "border-gray-200",
            )}
          >
            <Image src={product.imgCover} alt={product.title} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
