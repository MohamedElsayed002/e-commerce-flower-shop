import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { APIResponse } from "./lib/types/api";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  // Custom sign-in page
  pages: {
    signIn: "/",
    error: "/",
  },

  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      //Function to handle user authentication
      authorize: async (credentials) => {
        const baseUrl = process.env.API + "/auth/signin";

        const response = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();
        console.log("payload", payload);
        if (payload.message === "success") {
          return {
            token: payload.token,
            ...payload.user,
          };
        }
        throw new Error(payload.message);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.gender = user.gender;
        token.phone = user.phone;
        token.role = user.role;
        token.addresses = user.addresses;
        token.id = user.id;
        token.token = user.token;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.gender = token.gender;
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.user.addresses = token.addresses;

      return session;
    },
  },
};

export default NextAuth(authOptions);
