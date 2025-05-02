import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getToken() {
  // Get token
  const tokenCookies = cookies().get("next-auth.session-token" as string)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  return token?.token;
}
