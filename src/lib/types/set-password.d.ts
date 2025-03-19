declare type SetPasswordFields = {
  email: string;
  newPassword:string;
}

declare type SuccessfulResponse = {
  message: string;
  token: string;
}

declare type ErrorResponse = {
  error: string;
}

declare type SetPasswordResponse = SuccessfulResponse | ErrorResponse;