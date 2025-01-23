import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Providers from "@/components/provider";
import { Inter, Roboto } from "next/font/google";

type LocaleLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});


export default function LocaleLayout({ params: { locale }, children }: LocaleLayoutProps) {
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${inter.variable} ${roboto.variable}`}>
      <body className={`antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}