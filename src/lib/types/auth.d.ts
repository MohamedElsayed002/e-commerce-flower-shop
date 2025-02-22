import { error } from 'console';
import { Session } from "inspector/promises";

declare type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  addresses: [
    {
      street: string;
      phone: string;
      city: string;
      _id: string;
    },
    {
      street: string;
      phone: string;
      city: string;
      lat: string;
      long: string;
      username: string;
      _id: string;
    }
  ];
} & DatabaseFields;

declare interface LoginResponse {
  token: string;
  user: User;
}

declare type RegisterFields = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  password:string;
  rePassword:string;
  addresses: [
    {
      street: string;
      phone: string;
      city: string;
      _id: string;
    },
    {
      street: string;
      phone: string;
      city: string;
      lat: string;
      long: string;
      username: string;
      _id: string;
    }
  ];
};