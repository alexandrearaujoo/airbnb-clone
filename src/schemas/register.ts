import { z } from 'zod';

export type RegisterProps = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Minimum of 2 characters'),
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(4, 'The password must be between 4 and 60 characters long.')
    .max(60, 'The password must be between 4 and 60 characters long.')
});
