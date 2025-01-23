import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong, FaArrowRightLong, FaCheck } from "react-icons/fa6";

export default function AboutUsContent() {
  const t = useTranslations();

  // Common style for check icon
  const checkIconStyles =
    "bg-custom-purple-400 text-white w-[42px] h-[42px] rounded-full flex justify-center items-center";

  return (
    <div className="about flex flex-col w-[657px] gap-6">
      <h6
        className="text-[17px] font-bold uppercase text-custom-light-rose-900"
        style={{ letterSpacing: "4px" }}
      >
        {t("about-us")}
      </h6>
      <div>
        <p className="text-custom-blue-gray-600 text-3xl font-bold w-[603px]">
          {t("we-provide-best-and-quality")}{" "}
          <span className="text-custom-light-rose-900">
            {t("gifts")} <br /> {t("box")}
          </span>{" "}
          {t("product-for-you")}
        </p>
        <p className="text-custom-blue-gray-200 w-[631px]">
          {t(
            "at-rose-we-are-dedicated-to-curating-exceptional-products-that-inspire-our-mission-is-to-provide-quality-affordability-and-unmatched-customer-satisfaction-in-every-purchase"
          )}
        </p>
      </div>
      {/* Discover More Button */}
      <Button
        asChild
        className="bg-custom-light-rose-900 h-[49px] w-[167px] rounded-[10px] py-[10px] px-5 hover:bg-custom-light-rose-800"
      >
        <Link href="/about">
          {t("discover-more")}
          <span className="ltr:inline rtl:hidden">
            <FaArrowRightLong />
          </span>
          <span className="rtl:inline ltr:hidden">
            <FaArrowLeftLong />
          </span>
        </Link>
      </Button>

      {/* About Us Offers */}
      <div className="about-us-offers grid grid-cols-2">
        {[
          t("streamlined-shipping-experience"),
          t("affordable-modern-design"),
          t("competitive-price-and-easy-to-shop"),
          t("we-made-awesome-products"),
        ].map((offer, index) => (
          <div key={index} className="mb-2 flex justify-start items-center">
            <div className={`${checkIconStyles} mr-[13.5px] rtl:ml-[13.5px]`}>
              <FaCheck />
            </div>
            <p className="text-xs font-medium">{offer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
