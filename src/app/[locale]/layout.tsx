import Providers from "@/components/provider";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default function LocaleLayout({
  params: { locale },
  children,
}: LocaleLayoutProps) {
  // Check if the provided locale is valid by verifying it against the allowed locales.

  if (!routing.locales.includes(locale)) notFound(); // If the locale is invalid, trigger the 'notFound' function.

  // Setting the request's locale with `setRequestLocale(locale)` ensures localized static content during rendering.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
