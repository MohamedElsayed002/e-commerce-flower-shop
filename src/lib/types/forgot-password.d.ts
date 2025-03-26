
declare type SuccessfulForgotPassword = {
    message: "success"
    info : string
  }
  
  declare type ErrorResponse = {
    error: string
  }

  declare type ForgotPasswordResponse<T> = SuccessfulResponse<T> | ErrorResponse;
