import { NextResponse } from 'next/server'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function GET() {
  try {
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
    if (!userDB || !userDB.id) {
      return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
      })
    }

    const markers = await prisma.local.findMany({
      where: {
        responsibleUserId: userDB.id,
      },
    })

    return NextResponse.json(markers)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
