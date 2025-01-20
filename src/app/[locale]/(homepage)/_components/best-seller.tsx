"use client";

import EmblaCarousel from "@/components/custom/embla-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { EmblaOptionsType } from "embla-carousel";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/components/common/loading-component";
import { useTranslations } from "next-intl";

export default function BestSeller() {
const t = useTranslations();

  const options: EmblaOptionsType = {
    loop: true,
    slidesToScroll: 1,
    align: "start",
    containScroll: "trimSnaps",
  };

  const { isLoading, error, data: payload } = useQuery({
    queryKey: ["best-seller", "673c46fd1159920171827c85"],
    queryFn: async () => {
      const response = await fetch("/api/best-seller?category=673c46fd1159920171827c85");
      if (!response.ok) {
        throw new Error("Failed to fetch best-seller products");
      }
      const payload = await response.json();
      return payload.sort((a: { sold: number }, b: { sold: number }) => b.sold - a.sold);
    },
  });

  if (isLoading) return <LoadingComponent />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;



  return (
    <div className="best-seller w-[1279px] h-[371px] flex justify-between mb-20">
      <div className="best-seller-about w-[301px] flex flex-col gap-[28.7px]">
        <h6 className="text-rose-400 text-[17px] font-bold tracking-[4px] uppercase">
          {t('premium-gifts')}
        </h6>
        <div>
          <p className="text-blueGray-600 text-[30px] font-bold capitalize leading-[40.8px]">
            best{" "}
            <span className="text-rose-400">
              seller <br /> gifts
            </span>{" "}
            and products
          </p>
          <p className="text-blueGray-200 text-base font-normal leading-[28.8px]">
            Recusandae tempora aut laborum molestias veniam. A commodi sequi
            accusantium ullam cupiditate. Neque quidem qui et autem dolor dicta
            necessitatibus ut ad.
          </p>
        </div>
        <Button asChild>
          <Link href="/category">
            {t('explore-more')} <FaArrowRightLong />
          </Link>
        </Button>
      </div>
      <div className="best-seller-products w-[954px]">
        <EmblaCarousel slides={payload} options={options} />
      </div>
    </div>
  );
}
