import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { BsHandbag } from "react-icons/bs";
import { FaRegEye, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa6";
import { useFormatter } from "next-intl";

// Props for the BestSellerProducts component
type BestSellerProductsProps = {
  product: Product;
};

export default function BestSellerProducts({ product }: BestSellerProductsProps) {
  // Translation
  const format = useFormatter();

  return (
    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
      {/* Product Card */}
      <Card className="w-[302px] rounded-[20px]">
        {/* Card Header */}
        <CardHeader className="group bg-main-color rounded-[20px] flex justify-center items-center mb-4 overflow-hidden relative">
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[#F82BA9B2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>

          {/* Product Image */}
          <Image
            src={product.imgCover}
            alt={product.title}
            width={222}
            height={0}
            className="w-[222px] h-[222px] group-hover:opacity-70 transition-opacity duration-300 z-10 mt-5 mb-[30px]"
          />

          {/* Hover Action Buttons */}
          <div className="absolute inset-0 flex justify-center items-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            {/* View Product Button */}
            <Button className="bg-custom-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-rose-800">
              <FaRegEye />
            </Button>

            {/* Add to Wishlist Button */}
            <Button className="bg-custom-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-rose-800">
              <FaRegHeart />
            </Button>
          </div>
        </CardHeader>

        {/* Product Details */}
        <CardContent className="px-4">
          <div className="product-data flex justify-between items-center">
            {/* Product Information */}
            <div className="flex flex-col justify-start gap-[9px]">
              {/* Product Title */}
              <h6 className="text-start text-[17px] font-semibold text-blue-gray-900 font-inter line-clamp-1">
                {product.title}
              </h6>

              {/* Product Rating */}
              <div className="flex text-rate-color">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
              </div>

              {/* Product Price */}
              <p className="text-base text-flamingo font-medium text-start font-roboto">
                {/* Display discounted price if available */}
                {format.number(product.priceAfterDiscount || product.price, {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                {product.priceAfterDiscount && (
                  <span className="line-through text-blue-gray-50">
                    {format.number(product.price, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                )}
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button className="text-white bg-custom-purple-900 w-[42px] h-[42px] rounded-full flex justify-center items-center hover:bg-custom-purple-800">
              <BsHandbag />
            </Button>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
