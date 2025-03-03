declare type DatabaseFields = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type SuccessfulResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  error: string;
};

declare type SuccessfulForgotPassword = {
    message : "success"
    info : string
}

declare type ForgotPasswordResponse = SuccessfulForgotPassword | ErrorResponse
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