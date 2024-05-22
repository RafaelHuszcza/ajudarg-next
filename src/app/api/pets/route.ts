import { NextResponse } from 'next/server'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function GET() {
  try {
    const pets = await prisma.animal.findMany({
      include: {
        local: true,
      },
    })
    return NextResponse.json(pets)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSessionWithAuth()
    if (!session || !session.user?.email) {
      return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
      })
    }
    const {
      specie,
      color,
      size,
      breed,
      tag,
      imageUrl,
      localId,
      ownerName,
      ownerPhone,
      gender,
      age,
    } = await request.json()

    const userDB = await prisma.user.findFirst({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!userDB) {
      return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
      })
    }
    const localDB = await prisma.local.findFirst({
      where: { id: localId, responsibleUserId: userDB.id },
    })
    if (!localDB) {
      return new NextResponse(
        JSON.stringify({ error: 'Local Não encontrado' }),
        {
          status: 404,
        },
      )
    }

    await prisma.animal.create({
      data: {
        specie,
        color,
        size,
        breed,
        tag,
        imageUrl,
        localId,
        ownerName,
        ownerPhone,
        gender,
        age,
      },
    })
    return NextResponse.json({ message: 'Pet cadastrado com sucesso' })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
