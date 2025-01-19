import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type LocaleLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;



export default function LocaleLayout({ params: { locale }, children }: LocaleLayoutProps) {
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`antialiased`}>
        <Navbar/>
          {children}
          <Footer/>
      </body>
    </html>
  );
}