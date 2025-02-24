
type ResetPasswordSuccess = {
    message: "success";
    token: string;
  };
  
  type ResetPasswordError = {
    error: string;
  };
  
  // Union type to handle both cases
  type ResetPasswordResponse = ResetPasswordSuccess | ResetPasswordError;
  