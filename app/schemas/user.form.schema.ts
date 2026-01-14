import { z } from 'zod'

export const userFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50),

  email: z.string().email('Invalid email address'),

  gender: z.string().min(1, 'Gender is required'),

  country: z.string().optional(),

  age: z
  .string()
  .min(1, 'Age is required')
  .refine(
    (val) => {
      const num = Number(val)
      return !isNaN(num) && num >= 18
    },
    {
      message: 'Age must be a number and at least 18',
    }
  ),
    
})

export type UserFormValues = z.infer<typeof userFormSchema>
