declare type SetPasswordFields = {
  email: string;
  newPassword: string;
};

declare type SetPasswordResponse = {
  message: string;
  token: string;
}