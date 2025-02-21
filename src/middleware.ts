import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define authentication-related routes
// const AUTH_PAGES = ["/auth/login", "/auth/register"];
const PRIVATE_PAGES = ["/card"];

export default async function middleware(request: NextRequest) {
  // Retrieve authentication token from the request
  const token = await getToken({ req: request });
  console.log("Middleware Token:", token);

  // Get the current requested URL path
  const urlPath = request.nextUrl.pathname;

  // Redirect authenticated users away from auth popup
  if (token && !PRIVATE_PAGES.includes(urlPath)) {
    return NextResponse.rewrite(new URL("/card", request.nextUrl.origin));
  }

  // Redirect unauthenticated users away from private pages
  if (!token && PRIVATE_PAGES.includes(urlPath)) {
    return NextResponse.rewrite(new URL("/", request.nextUrl.origin));
  }

  // Continue request processing for other routes
  return NextResponse.next();
}

//Apply matcher
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
