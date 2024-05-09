// import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

import { riskAreas } from './riskAreas.js'
// import { prisma } from '@/services/database'

export async function GET() {
  try {
    return NextResponse.json(riskAreas)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
