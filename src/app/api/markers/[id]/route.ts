import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const markerId = params.id
  if (!markerId) {
    return new NextResponse(
      JSON.stringify({ error: 'Localização não encontrada' }),
      {
        status: 404,
      },
    )
  }
  const marker = await request.json()
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const userDB = await prisma.user.findFirst({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!userDB) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }
  const markerDB = await prisma.local.findFirst({
    where: { id: markerId },
    select: { responsibleUserId: true },
  })
  if (!markerDB) {
    return new NextResponse(
      JSON.stringify({ error: 'Localização não encontrada' }),
      { status: 404 },
    )
  }
  if (markerDB.responsibleUserId !== userDB.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      { status: 401 },
    )
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
    hours: z.string({ required_error: 'Horário é necessário' }).optional(),
    WhatsApp: z.string({ required_error: 'WhatsApp é necessário' }).optional(),
    phone: z.string({ required_error: 'Telefone é necessário' }).optional(),
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
  const needs = marker.needs.map((need: { name: string; amount: number }) =>
    JSON.stringify(need),
  )
  await prisma.local.update({
    where: { id: markerId },
    data: {
      name: marker.name,
      lat: marker.lat,
      lng: marker.lng,
      type: marker.type,
      needs,
      address: marker.address,
      vacancies: marker.vacancies,
      occupation: marker.occupation,
      hours: marker.hours,
      WhatsApp: marker.WhatsApp,
      phone: marker.phone,
    },
  })

  return NextResponse.json({ message: 'Localização atualizado com sucesso' })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const markerId = params.id
  if (!markerId) {
    return new NextResponse(
      JSON.stringify({ error: 'Localização não encontrada' }),
      {
        status: 404,
      },
    )
  }

  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const userDB = await prisma.user.findFirst({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!userDB) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }
  const markerDB = await prisma.local.findFirst({
    where: { id: markerId },
    select: { responsibleUserId: true },
  })
  if (!markerDB) {
    return new NextResponse(
      JSON.stringify({ error: 'Localização não encontrada' }),
      { status: 404 },
    )
  }
  if (markerDB.responsibleUserId !== userDB.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      { status: 401 },
    )
  }

  await prisma.local.delete({
    where: { id: markerId },
  })

  return NextResponse.json({ message: 'Localização deletado com sucesso' })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const userDB = await prisma.user.findFirst({
    where: { email: session.user.email },
    select: { id: true },
  })
  if (!userDB) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const markerId = params.id
  if (!markerId) {
    return new NextResponse(
      JSON.stringify({ error: 'Localização não encontrada' }),
      {
        status: 404,
      },
    )
  }

  const marker = await prisma.local.findFirst({
    where: { id: markerId },
  })

  if (!marker) {
    return new NextResponse(
      JSON.stringify({ error: 'Localização não encontrada' }),
      { status: 404 },
    )
  }

  const responsibleUser = await prisma.user.findFirst({
    where: { id: marker.responsibleUserId },
    select: { email: true },
  })

  if (!responsibleUser || !responsibleUser.email) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário responsável não encontrado' }),
      { status: 404 },
    )
  }

  if (userDB.id !== marker.responsibleUserId) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      { status: 401 },
    )
  }

  interface BFFmarker {
    id: string
    name: string
    lat: number
    lng: number
    type: string
    needs: { name: string; amount: number }[]
    address: string
    vacancies: number
    occupation: number
    hours: string | null
    WhatsApp: string | null
    phone: string | null
    responsibleEmail: string
  }

  const email = responsibleUser.email

  const needs: { name: string; amount: number }[] = marker.needs.map(
    (need: string): { name: string; amount: number } => {
      try {
        return JSON.parse(need)
      } catch {
        return { name: need, amount: 0 }
      }
    },
  )

  const data: BFFmarker = { ...marker, needs, responsibleEmail: email }
  return NextResponse.json(data)
}
