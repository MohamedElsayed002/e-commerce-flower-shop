
// Define API response types
type VerifyPasswordSuccess = {
    status: "Success"; // API returns { "status": "Success" }
  };
  
  type VerifyPasswordError = {
    error: string; // API returns { "error": "Some error message" }
  };
  
  // Union type for handling both success and error cases
  type VerifyPasswordResponse = VerifyPasswordSuccess | VerifyPasswordError;