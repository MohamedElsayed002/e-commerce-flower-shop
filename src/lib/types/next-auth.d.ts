/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends Pick<DatabaseFields, "_id"> {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    photo: string;
    role: string;
    addresses: {
      street: string;
      phone: string;
      city: string;
      _id: string;
      lat: string;
      long: string;
      username: string;
    }[];
  }

  interface Session {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
      phone: string;
      photo: string;
      role: string;
      addresses: {
        street: string;
        phone: string;
        city: string;
        _id: string;
        lat: string;
        long: string;
        username: string;
      }[];
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    photo: string;
    role: string;
    addresses: {
      street: string;
      phone: string;
      city: string;
      _id: string;
      lat: string;
      long: string;
      username: string;
    }[];
  }
}
