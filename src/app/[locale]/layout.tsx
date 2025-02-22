import Providers from "@/components/provider";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Roboto } from "next/font/google";
import { cn } from "@/lib/utils/cn";
import { LayoutProps } from "@/lib/types/common";
import { Toaster } from "sonner";

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

export default function LocaleLayout({ params: { locale }, children }: LayoutProps) {
  // Check if the provided locale is valid by verifying it against the allowed locales.
  if (!routing.locales.includes(locale)) notFound();

  // Setting the request's locale with `setRequestLocale(locale)` ensures localized static content during rendering.
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cn(inter.variable, roboto.variable, inter.className, "antialiased")}>
        <Providers>
          {children}
          {/* Toaster */}
          {/* <Toaster/> */}
          </Providers>
      </body>
    </html>
  );
}