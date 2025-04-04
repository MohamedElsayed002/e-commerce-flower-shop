
declare type SuccessfulForgotPassword = {
  message: "success"
  info: string
}

declare type ForgotErrorResponse = {
  error: string
}

declare type ForgotPasswordResponse = SuccessfulForgotPassword | ForgotErrorResponse;
