"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { getTwoWords } from "@/lib/utils/string";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/components/common/loading-component";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ErrorComponent from "@/components/common/error-component";

export default function PopularProducts() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<number>(0);

  // Add rating to products
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const handleRating = (productId: string, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  // Tabs with categoryIDs and labels for filtering products
  const tabs = [
    {
      id: 0,
      label: t("home-and-living"),
      categoryId: "673c46fd1159920171827c85",
    },
    {
      id: 1,
      label: t("garment-care"),
      categoryId: "673c47751159920171827c93",
    },
    {
      id: 2,
      label: t("gifts-box"),
      categoryId: "673c472f1159920171827c8a",
    },
    {
      id: 3,
      label: t("occasion-gifts"),
      categoryId: "673c479e1159920171827c99",
    },
  ];

  // Fetch products for the currently active tab
  const {
    isLoading,
    error,
    data: payload,
  } = useQuery({
    queryKey: ["products", tabs[activeTab]?.categoryId],
    queryFn: async () => {
      const response = await fetch(
        `/api/products?category=${tabs[activeTab]?.categoryId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch best-seller products");
      }
      const payload = await response.json();
      return payload.sort(
        (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
      );
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (error instanceof Error) return <ErrorComponent />;

  return (
    <div className="mb-20 w-[1280px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div className="relative">
          <h3 className="text-blueGray-600 font-bold text-[30px] z-10">
            {t("popular-products")}
          </h3>
          <div className="bg-light-pink-900 w-[53px] h-[2px] z-10"></div>
          <div
            className="bg-light-pink-50 w-[136px] h-[17px] absolute bottom-0 -z-10 
            rounded-e-full rtl:rounded-s-none"
          ></div>
        </div>
        {/* Tabs for Category Selection */}
        <div className="tabs">
          <ul className="list-none flex gap-6 text-xl font-normal text-blueGray-600">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer transition-all rounded-md ${
                  activeTab === tab.id
                    ? "text-light-pink-900 underline underline-offset-[10%] decoration-2"
                    : "hover:text-light-pink-900"
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-6">
        {isLoading ? (
          <LoadingComponent />
        ) : payload?.length === 0 ? (
          <div className="col-span-4 text-center text-xl font-semibold text-blueGray-600">
            {t("no-products-here")}
          </div>
        ) : (
          payload?.map((product: Product) => (
            <Card className="w-[302px] rounded-[20px]" key={product.id}>
              <CardHeader className="group bg-light-pink-50 rounded-[20px] flex justify-center items-center mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#F82BA9B2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>
                <Image
                  src={product.imgCover}
                  alt={product.title}
                  width={222}
                  height={222}
                  className="w-[222px] h-[222px] mt-5 mb-[30px] group-hover:opacity-70 transition-opacity duration-300 z-10"
                />
                <div className="absolute inset-0 flex justify-center items-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="cursor-pointer bg-light-pink-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white">
                    <FaRegEye />
                  </div>
                  <div className="cursor-pointer bg-light-pink-900 text-2xl w-10 h-10 rounded-full flex justify-center items-center text-white">
                    <FaRegHeart />
                  </div>
                </div>
              </CardHeader>

              {/* Product Information */}
              <CardContent className="px-4">
                <div className="product-data flex justify-between items-center">
                  <div className="flex flex-col justify-start gap-[9px]">
                    <h6 className="text-start text-[17px] font-semibold text-blueGray-600">
                      {getTwoWords(product.title)}
                    </h6>
                    {/* Star Rating */}
                    <div className="flex text-[#FBA707]">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                onClick={() => handleRating(product.id, index + 1)}
                className="cursor-pointer"
              >
                {index < (ratings[product.id] || 0) ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          </div>
                    {/* Price */}
                    <p className="text-base text-[#F05454] font-medium text-start">
                      ${product.priceAfterDiscount || product.price.toFixed(2)}{" "}
                      {product.priceAfterDiscount && (
                        <span className="line-through text-blueGray-100">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                  {/* Add to Cart Icon */}
                  <div className="cursor-pointer text-white bg-purple-400 w-[42px] h-[42px] rounded-full flex justify-center items-center">
                    <BsHandbag />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
