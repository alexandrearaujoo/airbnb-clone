import { z } from 'zod';

export type LoginProps = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string({ required_error: 'This field is required' })
});
