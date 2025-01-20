// import { useTranslations } from "next-intl";
import Providers from "@/components/provider";
import { setRequestLocale } from "next-intl/server";

type HomeLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;

export default function HomeLayout({ params: { locale }, children }: HomeLayoutProps) {
  setRequestLocale(locale);

  // Translation
  // const t = useTranslations();

  return (
    <>
    <Providers>
        {children}
    </Providers>
    </>
  );
}