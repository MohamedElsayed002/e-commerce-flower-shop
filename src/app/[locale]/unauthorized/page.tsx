import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Unauthorized() {
  // Translation
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Image */}
      <Image
        src="/assets/images/block.png"
        alt="Unauthorized"
        width={360}
        height={360}
        className="mb-6"
      />

      {/* Text */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        {t("you-are-not-authorized-to-access-this-page")}
      </h1>

      {/* Text */}
      <p className="text-gray-500 ">{t("if-you-think-this-is-wrong-please-contact-support")}</p>

      <div className="border-t border-gray-300 my-4 w-full max-w-sm mx-auto" />
      {/* Button */}
      <Link href="/">
        <Button className="bg-white text-black rounded-lg shadow-sm border px-6 py-2 hover:bg-transparent">
          {t("go-to-homepage")}
        </Button>
      </Link>
    </div>
  );
}
