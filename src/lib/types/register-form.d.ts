// Define the form input type
declare type RegisterForm = {
    firstName: string
    lastName: string
    email: string
    password: string
    rePassword: string
    phone?: string
    gender: "male" | "female"
};

// Type for the user object in a successful response
declare type User = {
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
declare type RegisterSuccess = {
    user: User
    token: string
};