// declare type DatabaseFields = {
//   _id: string;
//   createdAt: string;
//   updatedAt: string;
// };

// declare type SuccessfulResponse<T> = {
//   message: "success";
// } & T;

// declare type ValidationError = {
//   field: string;
//   errorMessage: string;
// };

// declare type ErrorResponse = {
//   error: string | ValidationError[];
//   message: string | ValidationError[];
// };

// declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

// declare type Metadata = {
//   currentPage: number;
//   limit: number;
//   totalPages: number;
//   totalItems: number;
// };

// declare type PaginatedResponse<T> = {
//   [key: string]: T;
//   pagination: Metadata;
// };
import { status } from "./../../../node_modules/next-auth/client/__tests__/helpers/mocks.d";

declare type SuccessfulResponse<T> = {
  message: "success";
<<<<<<< HEAD
  token:"string";
  user:User;
  statusCode: number;
  data: T;
};

declare type ErrorResponse = {
  message: "error" | "fail";
  statusCode: number;
  message: "string";
=======
} & T;

declare type ErrorResponse = {
  error: string;
>>>>>>> e0fe9bfabd088ef89b0f2fe119fd3b1991e05c1d
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

<<<<<<< HEAD
=======
declare type Metadata = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

declare type PaginatedResponse<T> = {
  metadata: Metadata;
} & T;
>>>>>>> e0fe9bfabd088ef89b0f2fe119fd3b1991e05c1d
