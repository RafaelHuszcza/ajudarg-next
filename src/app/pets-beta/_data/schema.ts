import { z } from 'zod'

export const petsSchema = z.object({
  id: z.string(),
  imageUrl: z.string().nullable(),
  localId: z.string(),
  tag: z.string().nullable(),
  breed: z.string().nullable(),
  specie: z.string(),
  size: z.string(),
  color: z.string(),
  local: z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
  }),
  ownerName: z.string(),
  ownerPhone: z.string(),
  gender: z.string().optional(),
  age: z.string().optional(),
})

export type Pets = z.infer<typeof petsSchema>
