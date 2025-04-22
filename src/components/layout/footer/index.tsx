import FooterInput from "@/components/layout/footer/components/subscribe";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  // Translation
  const t = useTranslations();

  // Variables
  const discount = 20;

  return (
    <footer className="relative pb-24">
      {/* Image */}
      <Image
        src="/assets/images/cover.png"
        alt="Footer image"
        sizes="100vw"
        fill
        className="object-cover -z-[1] opacity-30"
      />

      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-10 ">
        {/* Footer Header Contents */}
        <div className="flex gap-20 justify-center pt-10 ps-20 text-blue-gray-900 font-bold">
          <Link href="#">{t("about-us")}</Link>
          <Link href="#">{t("store-location")}</Link>
          <Link href="/contact">{t("contact")}</Link>
          <Link href="#">{t("delivery")} </Link>
          <Link href="#">{t("policy")}</Link>
          <Link href="#">{t("faqs")}</Link>
        </div>

        {/* Subscribe */}
        <div className=" text-center flex flex-col gap-2">
          {/* Discount Part */}

          {/* Headline */}
          <p className="text-[30px] font-bold text-blue-gray-900">
            {t.rich("discount-offer", {
              discount,
              span: (v) => <span className="text-custom-rose-900">{v}</span>,
            })}
          </p>

          {/* Description */}
          <p className="text-blue-gray-500 text-xl font-medium">
            {t("by-subscribe-our-newsletter")}
          </p>
        </div>

        {/* Subscribe Input */}
        <FooterInput />
      </div>
    </footer>
  );
}
