// Define the form input type
declare type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone?: string;
  gender: "male" | "female";
};

// Type for the user object in a successful response
declare type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  phone: string;
  photo: string;
  role: string;
  _id: string;
} & DatabaseFields;

// Type for a successful response
declare type RegisterSuccess = {
  message: "success";
  user: User;
  token: string;
};

declare type RegisterErrorResponse = {
  error: string;
};

declare type RegisterResponse = RegisterSuccess | RegisterErrorResponse;
