import { z } from 'zod'


export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const verifyCodeSchema = z.object({
    code: z.string().min(6, "Code must be at least 6 characters"),
});

export const setPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});