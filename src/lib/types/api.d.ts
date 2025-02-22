import { status } from "./../../../node_modules/next-auth/client/__tests__/helpers/mocks.d";

declare type DatabaseFields = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type SuccessfulResponse<T> = {
  message: "success";
  token:"string";
  user:User;
  statusCode: number;
  data: T;
};

declare type ErrorResponse = {
  message: "error" | "fail";
  statusCode: number;
  message: "string";
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare type Metadata = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

declare type PaginatedResponse<T> = {
  metadata: Metadata;
} & T;
