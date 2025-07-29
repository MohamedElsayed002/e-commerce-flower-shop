import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LOCALES, routing } from "./i18n/routing";

// Private pages
const privatePages = ["/cart", "/checkout", "/allOrders", "/paymant", "/dashboard"];

// Dashboard pathname regex
const dashboardPathRegex = RegExp(`^(/(${LOCALES.join("|")}))?/dashboard(\/.*)?$`, "i");

// Create middleware for handling internationalization (i18n)
const handleI18nRouting = createMiddleware(routing);

// Authentication middleware using NextAuth
const authMiddleware = withAuth(
  function onSuccess(req) {
    // Check if the current request path matches the dashboard
    const isDashboard = dashboardPathRegex.test(req.nextUrl.pathname);

    // Extract the token from the NextAuth session attached to the request
    const token = req.nextauth.token;

    // Extract the locale ('en', 'ar') from the first part of the pathname
    const locale = req.nextUrl.pathname.split("/")[1];

    // Redirect if user is not admin
    if (isDashboard && token?.role !== "admin") {
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
    return handleI18nRouting(req);
  },

  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/",
      error: "/",
    },
  },
);

export default async function middleware(req: NextRequest) {
  // Private pathname regex
  const privatePathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  // Check if the requested page is private
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  // Check if the current request path matches the dashboard
  const isDashboard = dashboardPathRegex.test(req.nextUrl.pathname);

  if (isPrivatePage || isDashboard) {
    // Apply NextAuth authentication for private pages

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  } else {
    // Apply internationalization middleware for public pages
    return handleI18nRouting(req);
  }
}

// Apply matchers
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
