import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function POST(request: Request) {
  try {
    const session = await getServerSessionWithAuth()
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
      })
    }
    const { email, password, name } = await request.json()
    const existingUser = await prisma.user.findFirst({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Usuário já registrado' },
        { status: 400 },
      )
    }

    const hashPassword = await hash(password, 12)
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    })
    return NextResponse.json({ message: 'User Created' })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
