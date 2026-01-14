import { z } from 'zod'

export const userFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50),
  email: z.string().email('Invalid email address'),
  gender: z.string().min(1, 'Gender is required'),
  country: z.string().optional(),
  category: z.string().min(1, 'At least one category must be selected'),
  interests: z.array(z.string()).min(1, 'At least one interest must be selected'),
  age: z
  .string()
  .min(1, 'Age is required')
  .refine(
    (val) => {
      const num = Number(val)
      return !isNaN(num) && num >= 18 && num <=100
    },
    {
      message: 'Age must be between 18 and 100',
    }
  ),
    
})

export type UserFormValues = z.infer<typeof userFormSchema>
