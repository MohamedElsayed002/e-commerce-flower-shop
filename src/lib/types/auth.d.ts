declare type SetPasswordFields = {
  email: string;
  newPassword:string;
}

declare type SetPasswordResponse = {
  token: string;
}