"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type ProductPropes = {
  product: Product;
};

export default function ProductCarousel({ product }: ProductPropes) {
  // State
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [thumbsApi, setThumbsApi] = React.useState<CarouselApi>();

  const images = product.images || [];

  // Initialize state and event listener when API is available
  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      thumbsApi?.scrollTo(api.selectedScrollSnap());
    });
  }, [api, thumbsApi]);

  return (
    <div className="w-[478.66px] flex flex-col">
      <div className="mb-2">
        {/* Carousel */}
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((img: string) => (
              <CarouselItem key={product._id}>
                <div className="relative w-full h-[478.66px]">
                  {/* Image */}
                  <Image src={img} alt={product.title} fill className="object-cover rounded-lg" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Thumbnails Carousel */}
      <div className="relative">
        {/* Carousel */}
        <Carousel
          setApi={setThumbsApi}
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
        >
          <CarouselContent>
            {images.map((img: string, index: number) => (
              <CarouselItem key={product._id} className="basis-1/4 ">
                {/* Button */}
                <button
                  onClick={() => {
                    api?.scrollTo(index);
                    setCurrent(index);
                  }}
                  className={cn(
                    "relative aspect-square rounded-lg overflow-hidden border-2 w-full",
                    current === index ? "border-custom-rose-900" : "border-gray-200",
                  )}
                >
                  {/* Image */}
                  <Image src={img} alt={product.title} fill className="object-cover" />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation Buttons */}
          <CarouselPrevious className="absolute right-auto rtl:left-[-2.5rem] ms-2 top-1/2" />
          <CarouselNext className="absolute me-2 top-1/2" />
        </Carousel>
      </div>
    </div>
  );
}
