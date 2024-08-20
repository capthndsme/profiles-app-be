import z from 'zod'

const GetUserSchema = z.object({
  userId: z.string(),
})

export type GetUserSchema = z.infer<typeof GetUserSchema>
export default GetUserSchema
