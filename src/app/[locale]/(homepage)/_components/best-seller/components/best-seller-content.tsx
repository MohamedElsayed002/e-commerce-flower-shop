import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function BestSellerContent() {
  // Translation
  const t = useTranslations();

  return (
    <div className="best-seller-about w-[301px] flex flex-col justify-between gap-[28.7px]">
      {/* Best seller H6 */}
      <h6 className="text-custom-rose-900 text-[17px] font-bold tracking-[4px] m-0 p-0 uppercase font-roboto">
        {t("premium-gifts")}
      </h6>

      {/* Best seller description */}
      <div>
        <p className="text-blue-gray-900 text-[30px] font-bold capitalize leading-[40.8px] font-inter">
          {t("best")}{" "}
          <span className="text-custom-rose-900">
            {t("seller")} <br /> {t("gifts")}
          </span>{" "}
          {t("and_products")}
        </p>
        <p className="text-blue-gray-500 text-base font-normal leading-[28.8px] font-roboto">
          {t("best-seller-paragraph")}
        </p>
      </div>

      {/* Explore more button */}
      <Button
        asChild
        className="bg-custom-rose-900 h-[49px] w-[158px] rounded-[10px] py-[10px] px-5 hover:bg-custom-rose-800 font-roboto"
      >
        {/* Explore more link */}
        <Link href="/category">
          {t("explore-more")}
          {/* Arrow right icon for ltr */}
          <span className="ltr:inline rtl:hidden">
            <FaArrowRightLong />
          </span>

          {/* Arrow left icon for rtl */}
          <span className="rtl:inline ltr:hidden">
            <FaArrowLeftLong />
          </span>
        </Link>
      </Button>
    </div>
  );
}
