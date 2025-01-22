import React from "react";
import FooterInput from "@/app/[locale]/(client)/_components/FooterInput";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  // Translation
  const t = useTranslations();

  // Variables
  const discount = 20;

  return (
    <footer className="footer cursor-pointer">
      {/* OverLay => Background Image */}
      <div className="relative">
        {/* Image */}
        <Image
          src="/assets/images/cover.png"
          alt="Footer image"
          sizes="100vw"
          fill
          className="object-cover"
        />

        <div className="flex flex-col justify-center items-center gap-10 ">
          {/* Footer Header Contents */}
          <div className="flex gap-[80px] justify-center pt-10 pr-[80px] text-[16px] pl-[80px] font-bold">
            <p>{t("About Us")}</p>
            <p>{t("Store Location")}</p>
            <p>{t("contact")}</p>
            <p>{t("Delivery")} </p>
            <p>{t("Policy")}</p>
            <p>{t("FAQS")}</p>
          </div>

          {/* Subscribe */}
          <div className=" text-center flex flex-col gap-[40px]  pt-5 ">
            {/* Discount Part */}
            <div>
              {/* Headline */}
              <p className="text-[30px] font-bold">
                {t("discountOffer", { discount })}
              </p>

              {/* Description */}
              <p className="text-[#757F95] text-[20px] font-medium">
                {t("By Subscribe Our Newsletter")}
              </p>
            </div>

            {/* Subscribe Input */}
            <div>
              <FooterInput />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
