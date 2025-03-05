// Define the form input type
type RegisterForm = {
    email: string
    password: string
    rePassword: string
    phone: string
    firstName: string
    lastName: string
    gender: "male" | "female"
  };
  
  // Type for the user object in a successful response
  type User = {
    firstName: string
    lastName: string
    email: string
    gender: "male" | "female"
    phone: string
    photo: string
    role: string
    wishlist: any[]
    _id: string
    addresses: any[]
  } & DatabaseFields
  
  // Type for a successful response
  type RegisterSuccess = {
    message: "success"
    user: User
    token: string
  };
  
  // Type for an error response
  type RegisterError = {
    error: string
  };
  
  // Union type to handle both success and error responses
  type RegisterResponse = RegisterSuccess | RegisterError