<<<<<<< HEAD
declare type VerifyOTPFields = {
  resetCode: string;
}

declare type VerifyOTPResponse = {
  status: string;
}
=======
declare type User = {
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
  password: string;
  rePassword: string;
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
>>>>>>> 3b687cac0310db0c2b8b58fe640267f3f9f94625
