import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize() {
        return { id: "demo" };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token }) => {
      return token;
    },
    session: ({ session }) => {
      return session;
    },
  },
};
