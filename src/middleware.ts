

import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { LOCALES, routing } from "./i18n/routing";


// // Define public and private pages
const PUBLIC_PAGES = ["/"];
const PRIVATE_PAGES = ["/cart"];

// // Internationalization Middleware
const handleI18nRouting = createMiddleware(routing);


// // Authentication Middleware
const authMiddleware = withAuth((req) => handleI18nRouting(req), {
 
  callbacks: {
    authorized: ({token}) => token != null
  },
  // callbacks: {
  //   authorized: ({ token }) => !!token, // Check if user is authenticated
  // },
  pages: {
    // Redirect to home for authentication
    signIn: "/", 
  },
});

export default async function middleware(req: NextRequest) {
  console.log("handle",handleI18nRouting(req) )
  console.log("routing",routing)
  // Retrieve authentication token
  const token = await getToken({ req });
  const urlPath = req.nextUrl.pathname;

  // Check if the requested path is public
  const isPublicPage = new RegExp(
    `^(/(${LOCALES.join("|")}))?(${PUBLIC_PAGES.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  ).test(urlPath);

  
  const pathname = req.nextUrl.pathname;
  console.log('assmaa',pathname)


    if (!token && PRIVATE_PAGES.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

   // Redirect unauthenticated users only when trying to access private pages
  //  if (!token && PRIVATE_PAGES.some((page) => urlPath.startsWith(page))) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // // Prevent callbackUrl parameter from appearing
  // if (token && req.nextUrl.searchParams.has("callbackUrl")) {
  //   return NextResponse.redirect(new URL(urlPath, req.url));
  // }

  // Apply i18n middleware for public pages
  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  // Apply authentication middleware for private pages
  // return (authMiddleware as any)(req);
  // return NextResponse.next();
  return (authMiddleware as any)(req);
}

// // Apply matchers
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Exclude API and static files
};





