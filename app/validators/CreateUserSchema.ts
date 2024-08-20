import z from 'zod'

const CreateUserSchema = z.object({
  firstName: z.string().min(1).max(128),
  lastName: z.string().min(1).max(128),
  middleName: z.string().min(1).max(128).optional(),
  email: z.string().min(1).max(128),
  // receive as string to avoid 0-prefix bugs
  phoneNumber: z.string().min(1).max(24)  
})

export type CreateUserSchema = z.infer<typeof CreateUserSchema>
export default CreateUserSchema
