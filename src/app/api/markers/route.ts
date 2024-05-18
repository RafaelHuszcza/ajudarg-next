import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function GET() {
  try {
    const markers = await prisma.local.findMany()
    return NextResponse.json(markers)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const marker = await request.json()

  const session = await getServerSessionWithAuth()
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }
  const markerSchema = z.object({
    name: z.string({ required_error: 'Nome é necessário' }),
    lat: z.number({ required_error: 'Latitude é necessária' }),
    lng: z.number({ required_error: 'Longitude é necessária' }),
    type: z.string({ required_error: 'Tipo é necessário' }),
    needs: z
      .array(z.object({ name: z.string(), amount: z.number() }))
      .default([]),
    address: z.string({ required_error: 'Endereço é necessário' }),
    hours: z.string({ required_error: 'Horário é necessário' }),
    WhatsApp: z.string({ required_error: 'WhatsApp é necessário' }).optional(),
    phone: z.string({ required_error: 'Telefone é necessário' }).optional(),
    meals: z.number().int({ message: 'Refeições é necessário' }).optional(),
    vacancies: z.number({ required_error: 'Vagas é necessário' }),
    occupation: z.number({ required_error: 'Ocupação é necessário' }),
  })
  type FormData = z.infer<typeof markerSchema>

  const markersValidate: FormData = markerSchema.parse(marker)
  if (!markersValidate) {
    return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
      status: 400,
    })
  }
  const { user } = session
  if (!user || !user.email) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const userDB = await prisma.user.findFirst({
    where: { email: user.email },
    select: { id: true },
  })

  if (!userDB) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const needs = marker.needs.map((need: { name: string; amount: number }) =>
    JSON.stringify(need),
  )
  await prisma.local.create({
    data: {
      name: marker.name,
      lat: marker.lat,
      lng: marker.lng,
      type: marker.type,
      needs,
      address: marker.address,
      vacancies: marker.vacancies,
      occupation: marker.occupation,
      responsibleUserId: userDB.id,
      hours: marker.hours,
      WhatsApp: marker.WhatsApp,
      phone: marker.phone,
    },
  })

  return NextResponse.json({ message: 'Localização criada com sucesso' })
}
