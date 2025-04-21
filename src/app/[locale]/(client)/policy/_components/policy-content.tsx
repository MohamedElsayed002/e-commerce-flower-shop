import { useTranslations } from "next-intl";
import React from "react";

export default function PolicyContent() {
  // Translation
  const t = useTranslations();

  return (
    <div className="container my-20">
      {/* Main title */}
      <div className="mb-4 text-blue-gray-900 font-inter leading-[36px] capitalize">
        <h1 className="text-[30px] font-bold">{t("policies-legal")}</h1>
      </div>

      <div className="text-custom-grey space-y-10 text-xl">
        {/* Terms and conditions section */}
        <section>
          {/* Title */}
          <h4 className="text-[26px] font-semibold mb-4 text-blue-gray-900">
            {t("terms-and-conditions")}
          </h4>

          {/* Description */}
          <ol className="list-decimal list-inside space-y-2">
            <li>{t("terms-rule-one")}</li>
            <li>{t("terms-rule-two")}</li>
            <li>{t("terms-rule-three")}</li>
          </ol>
        </section>

        {/* Privacy policy section */}
        <section>
          {/* Title */}
          <h4 className="text-[26px] font-semibold mb-4 text-blue-gray-900">
            {t("privacy-policy")}
          </h4>

          {/* Description */}
          <ol className="list-decimal list-inside space-y-2">
            <li>{t("privacy-rule-one")}</li>
            <li>{t("privacy-rule-two")}</li>
            <li>{t("privacy-rule-three")}</li>
          </ol>
        </section>

        {/* Cookies and data section */}
        <section>
          {/* Title */}
          <h4 className="text-[26px] font-semibold mb-4 text-blue-gray-900">
            {t("cookies-and-data")}
          </h4>
          
          {/* Description */}
          <ol className="list-decimal list-inside space-y-2">
            <li>{t("cookies-rule-one")}</li>
            <li>{t("cookies-rule-two")}</li>
            <li>{t("cookies-rule-three")}</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
