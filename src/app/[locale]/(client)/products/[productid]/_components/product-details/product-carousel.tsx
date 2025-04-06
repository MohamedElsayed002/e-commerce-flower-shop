"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

//Type
type Productprops = {
  product: Product;
};

export default function ProductCarousel({ product }: Productprops) {
  //State
  const [mainImage, setMainImage] = useState(product.imgCover);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  //Function
  const scrollPrev = useCallback(() => {
    if (emblaApi && emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi && emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <div className="w-[526px] flex flex-col">
      {/* Main Image */}
      <div className="relative mb-4 w-[526px] h-[480.66px] pr-[23.67px] pl-[23.67px] border rounded-[10px] border-[#00000014] flex justify-center overflow-hidden">
        <Image
          src={mainImage}
          alt={product.title}
          fill
          sizes="50vw"
          className="rounded-lg object-cover"
        />
      </div>

      {/* Thumbnail Carousel with Embla */}
      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 z-10 bg-white p-1 rounded-full shadow-md"
          disabled={!emblaApi?.canScrollPrev()}
        >
          <IoIosArrowBack size={20} />
        </button>

        {/* Thumbnails */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-[13.6px]">
            {[...product.images].map((img: string, index: number) => (
              <div
                key={index}
                className="relative flex justify-center w-[120.96px] h-[120.97px] border-2 cursor-pointer rounded-md overflow-hidden border-gray-300 flex-shrink-0"
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`Product Image ${index + 1}`}
                  width={120.96}
                  height={120.97}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={scrollNext}
          className="absolute right-0 z-10 bg-white p-1 rounded-full shadow-md"
          disabled={!emblaApi?.canScrollNext()}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
}
