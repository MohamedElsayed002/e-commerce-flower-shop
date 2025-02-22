import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { LOCALES, routing } from "./i18n/routing";

// Define public pages,private pages
const PUBLIC_PAGES = ["/"];
const PRIVATE_PAGES = ["/cart"];

// Internationalization Middleware
const handleI18nRouting = createMiddleware(routing);

// Authentication Middleware
const authMiddleware = withAuth((req) => handleI18nRouting(req), {
  callbacks: {
    // Check if user is authenticated
    authorized: ({ token }) => !!token,
  },
  pages: {
    // Redirect to homepage for authentication
    signIn: "/",
  },
});

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req }); // Retrieve auth token
  const urlPath = req.nextUrl.pathname;

  // Check if the requested path is public
  const isPublicPage = new RegExp(
    `^(/(${LOCALES.join("|")}))?(${PUBLIC_PAGES.flatMap((p) => (p === "/" ? ["", "/"] : p)).join(
      "|",
    )})/?$`,
    "i",
  ).test(urlPath);

  // Redirect authenticated users away from public pages
  if (token && PUBLIC_PAGES.includes(urlPath)) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Redirect unauthenticated users away from private pages
  if (!token && PRIVATE_PAGES.includes(urlPath)) {
    return NextResponse.redirect(new URL("/cart", req.nextUrl.origin));
  }

  // Apply i18n middleware for public pages
  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  // Apply authentication middleware for private pages
  return (authMiddleware as any)(req);
}

//Apply matchers
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Exclude API and static files
};
