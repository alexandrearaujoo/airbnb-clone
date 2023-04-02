import { z } from 'zod';

export type RentProps = z.infer<typeof rentSchema>;

export const rentSchema = z.object({
  category: z.string({ required_error: 'This field is required' }),
  location: z
    .object({
      flag: z.string(),
      label: z.string(),
      latlng: z.array(z.number()),
      region: z.string(),
      value: z.string()
    })
    .nullish(),
  guestCount: z
    .number()
    .positive('This number is invalid')
    .min(1, 'Minimum of 1 guest count')
    .default(1),
  roomCount: z
    .number()
    .positive('This number is invalid')
    .min(1, 'Minimum of 1 room count')
    .default(1),
  bathroomCount: z
    .number()
    .positive('This number is invalid')
    .min(1, 'Minimum of 1 bathroom count')
    .default(1),
  imageSrc: z.string({ required_error: 'This field is required' }),
  price: z.string({ required_error: 'This field is required' }),
  title: z.string({ required_error: 'This field is required' }),
  description: z.string({ required_error: 'This field is required' })
});
