declare type VerifyOTPFields = {
  resetCode: string;
};

declare type VerifyOTPResponse = {
  status: string;
};

declare type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: any[]; // NOTE: to be changed with actual type
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

declare type AuthFormState =
  | "login"
  | "register"
  | "forgot-password"
  | "verify-otp"
  | "set-password";

declare type SetPasswordFields = {
  email: string;
  newPassword: string;
};

declare type SetPasswordResponse = {
  message: string;
  token: string;
};

declare type ProfileFields = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};

declare type ProfileResponse = {
  message: string;
  user: User;
};
