"use client";

import LoadingComponent from "@/components/common/loading-component";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "@/components/common/error-component";
import React from "react";
import BestSellerProducts from "./best-seller-products";

export default function BestSellerCarousel() {
  // Fetch best-seller products data
  const {
    isLoading,
    error,
    data: payload,
  } = useQuery({
    queryKey: ["products", "673c46fd1159920171827c85", "-sold"],
    queryFn: async () => {
      const response = await fetch(
        "/api/filtered-products?category=673c46fd1159920171827c85&sort=-sold"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch best-seller products");
      }
      const payload = await response.json();
      return payload.sort(
        (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
      );
    },
  });

  if (error instanceof Error) return <ErrorComponent />;

  return (
    <div className="best-seller-products w-[954px] overflow-hidden flex justify-center items-center">
      <Carousel
        opts={{
          loop: true,
          slidesToScroll: 1,
          align: "start",
        }}
        className="w-[954px] relative"
      >
        {isLoading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
            <LoadingComponent />
          </div>
        ) : (
          <CarouselContent>
            {payload?.map((product: Product, index: number) => (
              <BestSellerProducts product={product} key={index} />
            ))}
          </CarouselContent>
        )}
        {/* Carousel Navigation */}
        <CarouselPrevious className="text-white left-[0.1rem] top-[8.5rem] border-0 bg-custom-light-rose-900 hover:bg-custom-light-rose-700" />
        <CarouselNext className="text-white right-[0.45rem] top-[8.5rem] border-0 bg-custom-light-rose-900 hover:bg-custom-light-rose-700" />
      </Carousel>
    </div>
  );
}
