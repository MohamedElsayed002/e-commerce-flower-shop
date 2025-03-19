declare type VerifyOTPFields = {
  resetCode: string;
}

declare type SuccessResponse = {
  status: string;
}

declare type ErrorResponse = {
  error: string;
}

declare type VerifyOTPResponse = SuccessResponse | ErrorResponse;