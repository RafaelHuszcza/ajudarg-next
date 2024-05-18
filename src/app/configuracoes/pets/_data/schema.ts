import { z } from 'zod'

const localSchema = z.object({
  name: z.string(),
  address: z.string(),
})

export const petSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  localId: z.string(),
  tag: z.string(),
  breed: z.string(),
  specie: z.string(),
  size: z.string(),
  color: z.string(),
  local: localSchema,
})

export type Pet = z.infer<typeof petSchema>
export type Local = z.infer<typeof localSchema>
