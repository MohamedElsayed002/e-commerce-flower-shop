import Providers from "@/components/provider";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Roboto } from "next/font/google";

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
  // Check if the provided locale is valid by verifying it against the allowed locales.

  if (!routing.locales.includes(locale)) notFound(); // If the locale is invalid, trigger the 'notFound' function.

  // Setting the request's locale with `setRequestLocale(locale)` ensures localized static content during rendering.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${roboto.variable}`}
    >
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
