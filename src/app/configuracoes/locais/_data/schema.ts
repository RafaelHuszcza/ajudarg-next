import { z } from 'zod'

export const markersSchema = z.object({
  id: z.string(),
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  responsibleUserId: z.string(),
  responsibleEmail: z.string(),
  needs: z.array(z.string()),
  address: z.string(),
  hours: z.string(),
  WhatsApp: z.string(),
  phone: z.string(),
  meals: z.number(),
  vacancies: z.number(),
  occupation: z.number(),
  type: z.string(),
  updatedAt: z.string(),
})

export type Marker = z.infer<typeof markersSchema>
