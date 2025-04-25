import { getTranslations } from "next-intl/server";
import { BsHeadset, BsTruck } from "react-icons/bs";
import { LuWalletMinimal } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";

export default async function SectionFeatures() {

  // Translations
  const t = await getTranslations();

  return (
    <div className="w-4/5 mx-auto bg-custom-rose-50 mt-12 grid grid-cols-4 p-10 rounded-[.9rem]  ">
      {/* Feature 1 */}
      <div className="flex items-center col-span-1 gap-3">
        <div className="bg-custom-rose-900 p-3 rounded-full ">
          {/* Icon */}
          <BsTruck className="w-6 h-6 text-white" />
        </div>

        {/* Text */}
        <p className="text-gray-500">
          <span className="font-bold text-gray-800">{t("free-delivery")}</span>
          <br /> <span className="text-sm"> {t("orders-over-120")}</span>
        </p>
      </div>

      {/* Feature 2 */}
      <div className="flex items-center col-span-1 gap-3">
        <div className="bg-custom-rose-900 p-3 rounded-full">
          {/* Icon */}
          <TfiReload className="w-6 h-6 text-white " />
        </div>

        {/* Text */}
        <p className="text-gray-500">
          <span className="font-bold text-gray-800">{t("get-refund")}</span>
          <br />
          <span className="text-sm"> {t("within-30-days-returns")}</span>
        </p>
      </div>

      {/* Feature 3 */}
      <div className="flex items-center col-span-1 gap-3">
        <div className="bg-custom-rose-900 p-3 rounded-full ">
          {/* Icon */}
          <LuWalletMinimal className="w-6 h-6  text-white" />
        </div>

        {/* Text */}
        <p className="text-gray-500">
          <span className="font-bold text-gray-800">{t("safe-payment")}</span>
          <br /> <span className="text-sm"> {t("100-secure-payment")}</span>
        </p>
      </div>

      {/* Feature 4 */}
      <div className="flex items-center col-span-1 gap-3">
        <div className="bg-custom-rose-900 p-3 rounded-full ">
          {/* Icon */}
          <BsHeadset className="w-6 h-6  text-white" />
        </div>

        {/* Text */}
        <p className="text-gray-500">
          <span className="font-bold text-gray-800">{t("24-7-support")}</span>
          <br /> <span className="text-sm"> {t("feel-free-to-call-us")}</span>
        </p>
      </div>
    </div>
  );
}
