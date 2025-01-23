import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { getTwoWords } from "@/lib/utils/string";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type PopularProductsProps = {
  product: Product;
};

export default function PopularProducts({ product }: PopularProductsProps) {
  return (
    <Card className="w-[302px] rounded-[20px]" key={product.id}>
      <CardHeader className="group bg-custom-light-rose-50 rounded-[20px] flex justify-center items-center mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#F82BA9B2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>
        <Image
          src={product.imgCover}
          alt={product.title}
          width={222}
          height={222}
          className="w-[222px] h-[222px] mt-5 mb-[30px] group-hover:opacity-70 transition-opacity duration-300 z-10"
        />
        <div className="absolute inset-0 flex justify-center items-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Button className="bg-custom-light-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-light-rose-800">
            <FaRegEye />
          </Button>
          <Button className="bg-custom-light-rose-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white hover:bg-custom-light-rose-800">
            <FaRegHeart />
          </Button>
        </div>
      </CardHeader>

      {/* Product Information */}
      <CardContent className="px-4">
        <div className="product-data flex justify-between items-center">
          <div className="flex flex-col justify-start gap-[9px]">
            <h6 className="text-start text-[17px] font-semibold text-custom-blue-gray-600 font-inter">
              {getTwoWords(product.title)}
            </h6>
            {/* Star Rating */}
            <div className="flex text-[#FBA707]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
            </div>
            {/* Price */}
            <p className="text-base text-[#F05454] font-medium text-start font-roboto">
              ${product.priceAfterDiscount || product.price.toFixed(2)}{" "}
              {product.priceAfterDiscount && (
                <span className="line-through text-custom-blue-gray-100">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </p>
          </div>
          {/* Add to Cart Icon */}
          <Button className="text-white bg-custom-purple-400 w-[42px] h-[42px] rounded-full flex justify-center items-center hover:bg-custom-purple-300">
            <BsHandbag />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
