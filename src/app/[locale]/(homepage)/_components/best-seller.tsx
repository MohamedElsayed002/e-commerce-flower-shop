/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/components/common/loading-component";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { getTwoWords } from "@/lib/utils/string";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

export default function BestSeller() {
  const t = useTranslations();

  const {
    isLoading,
    error,
    data: payload,
  } = useQuery({
    queryKey: ["products", "673c46fd1159920171827c85"],
    queryFn: async () => {
      const response = await fetch(
        "/api/products?category=673c46fd1159920171827c85"
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

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="best-seller w-[1279px] flex justify-between items-center mb-20">
      <div className="best-seller-about w-[301px] flex flex-col gap-[28.7px]">
        <h6 className="text-light-pink-900 text-[17px] font-bold tracking-[4px] uppercase">
          {t("premium-gifts")}
        </h6>
        <div>
          <p className="text-blueGray-600 text-[30px] font-bold capitalize leading-[40.8px]">
            {t("best")} {(" ")}
            <span className="text-light-pink-900">
              {t("seller")} <br /> {t("gifts")}
            </span>{" "}
            {t("and_products")}
          </p>
          <p className="text-blueGray-200 text-base font-normal leading-[28.8px]">
{t('explore-timeless-designs-crafted-with-care-from-elegant-necklaces-to-charming-rings-our-jewelry-adds-beauty-celebrate-special-moments-with-pieces-that-shine-effortlessly')}
          </p>
        </div>
        <Button asChild>
          <Link href="/category">
            {t("explore-more")} <FaArrowRightLong />
          </Link>
        </Button>
      </div>
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
      {payload?.map((product: any) => (
        <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
          <div>
            <Card className="w-[302px] rounded-[20px]">
              <CardHeader className="group bg-light-pink-50 rounded-[20px] flex justify-center items-center mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#F82BA9B2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>
                <Image
                  src={product.imgCover}
                  alt={product.title}
                  width={222}
                  height={222}
                  className="w-[222px] h-[222px] group-hover:opacity-70 transition-opacity duration-300 z-10 mt-5 mb-[30px]"
                />
                <div className="absolute inset-0 flex justify-center items-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-light-pink-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white">
                    <FaRegEye />
                  </div>
                  <div className="bg-light-pink-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white">
                    <FaRegHeart />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4">
                <div className="product-data flex justify-between items-center">
                  <div className="flex flex-col justify-start gap-[9px]">
                    <h6 className="text-start text-[17px] font-semibold text-blueGray-600">
                      {getTwoWords(product.title)}
                    </h6>
                    <div className="flex text-[#FBA707]">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaRegStar />
                    </div>
                    <p className="text-base text-[#F05454] font-medium text-start">
                      $
                      {product.priceAfterDiscount ||
                        product.price.toFixed(2)}{" "}
                      {product.priceAfterDiscount && (
                        <span className="line-through text-blueGray-100">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-white bg-purple-400 w-[42px] h-[42px] rounded-full flex justify-center items-center">
                    <BsHandbag />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  )}
  <CarouselPrevious className="left-0 top-[8.5rem] border-0 bg-light-pink-900 hover:bg-light-pink-700" />
  <CarouselNext className="right-1 top-[8.5rem] border-0 bg-light-pink-900 hover:bg-light-pink-700" />
</Carousel>
      </div>
    </div>
  );
}
