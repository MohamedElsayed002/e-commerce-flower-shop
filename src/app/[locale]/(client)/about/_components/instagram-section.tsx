import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function InstagramSection() {
  // Translations
  const t = await getTranslations();

  return (
    <div className="container flex flex-col my-20">
      {/* Title */}
      <div className="flex flex-col sm:items-center gap-2 mb-10 relative z-10 max-w-[442px] mx-auto py-[5px]">
        <p
          className={`text-blue-gray-900 font-inter font-bold text-[20px] md:text-[30px] leading-[24.2px] md:leading-[30.31px] relative z-10`}
        >
          {t("instagram")}
        </p>

        {/* The Decorate Line */}
        <div className="absolute start-0 top-[31px] z-0 w-[338px] h-[17px] bg-main-color ltr:rounded-tr-[20px] ltr:rounded-br-[20px] rtl:rounded-tl-[20px] rtl:rounded-bl-[20px]  after:absolute after:bottom-0 after:start-0 after:w-[161px] after:h-[2px] after:bg-custom-rose-900"></div>
      </div>

      {/* Images */}
      <div className="flex flex-wrap justify-center gap-5">
        {[1, 2, 3, 4, 5].map((num) => (
          <Image
            key={num}
            src={`/insta-${num}.png`}
            alt={`Instagram image ${num}`}
            width={237}
            height={237}
            className="rounded-md"
            style={{
              width: "237px",
              height: "237px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
