
// Type for the user object in a successful response
type User = {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    photo: string;
    role: string;
    wishlist: any[]; // Adjust the type if wishlist has a structure
    _id: string;
    addresses: any[]; // Adjust if addresses have a specific structure
    createdAt: string;
  };
  
  // Type for a successful response
  type RegisterSuccess = {
    message: "success";
    user: User;
    token: string;
  };
  
  // Type for an error response
  type RegisterError = {
    error: string;
  };
  
  // Union type to handle both success and error responses
  type RegisterResponse = RegisterSuccess | RegisterError;
  