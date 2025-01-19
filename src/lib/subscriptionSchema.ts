
import {z} from 'zod';

export const subscriptionSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
  });

 export  type EmailFields = z.infer<typeof subscriptionSchema>;