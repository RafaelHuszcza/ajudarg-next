import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const petId = params.id
  if (!petId) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }
  const pet = await request.json()
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
  const petDB = await prisma.animal.findFirst({
    where: { id: petId },
    select: { localId: true },
  })
  if (!petDB) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

  const localDB = await prisma.local.findFirst({
    where: {
      id: petDB.localId,
    },
    select: {
      responsibleUserId: true,
    },
  })

  if (localDB?.responsibleUserId !== userDB.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      { status: 401 },
    )
  }

  const petSchema = z.object({
    specie: z.string({ required_error: 'Espécie é necessária' }),
    color: z.string({ required_error: 'Cor é necessária' }),
    size: z.string({ required_error: 'Tamanho é necessário' }),
    breed: z.string({ required_error: 'Tamanho é necessário' }).optional(),
    tag: z.string({ required_error: 'Tamanho é necessário' }).optional(),
    imageUrl: z.string(),
    localId: z.string(),
    ownerName: z.string(),
    ownerPhone: z.string(),
    gender: z.string().optional(),
    age: z.string().optional(),
  })
  type FormData = z.infer<typeof petSchema>

  const petValidate: FormData = petSchema.parse(pet)
  if (!petValidate) {
    return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
      status: 400,
    })
  }
  await prisma.animal.update({
    where: { id: petId },
    data: {
      specie: pet.specie,
      color: pet.color,
      size: pet.size,
      breed: pet.breed,
      tag: pet.tag,
      imageUrl: pet.imageUrl,
      localId: pet.localId,
      ownerName: pet.ownerName,
      ownerPhone: pet.ownerPhone,
      gender: pet.gender,
      age: pet.age,
    },
  })

  return NextResponse.json({ message: 'Pet atualizado com sucesso' })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const petId = params.id
  if (!petId) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
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
  const petDB = await prisma.animal.findFirst({
    where: { id: petId },
    select: { localId: true },
  })
  if (!petDB) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }
  const localDB = await prisma.local.findFirst({
    where: {
      id: petDB.localId,
    },
    select: {
      responsibleUserId: true,
    },
  })

  if (localDB?.responsibleUserId !== userDB.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      { status: 401 },
    )
  }

  await prisma.animal.delete({
    where: { id: petId },
  })

  return NextResponse.json({ message: 'Pet deletado com sucesso' })
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

  const petId = params.id
  if (!petId) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

  const pet = await prisma.animal.findFirst({
    where: { id: petId },
  })

  if (!pet) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

  interface BFFpet {
    id: string
    specie: string
    color: string
    size: string
    breed: string | null
    tag: string | null
    imageUrl: string
    localId: string
    ownerName: string
    ownerPhone: string
    gender: string | null
    age: string | null
  }

  const data: BFFpet = { ...pet }
  return NextResponse.json(data)
}
