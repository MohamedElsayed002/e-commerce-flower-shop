declare type DatabaseFields = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type SuccessfulResponse<T> = {
  message: "success";
} & T;

declare type ValidationError = {
  field: string;
  errorMessage: string;
};

declare type ErrorResponse = {
  error: string | ValidationError[];
  message: string | ValidationError[];
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare type Metadata = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

declare type PaginatedResponse<T> = {
  [key: string]: T;
  pagination: Metadata;
};