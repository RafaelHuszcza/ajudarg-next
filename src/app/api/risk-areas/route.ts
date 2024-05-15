// import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

import riskareas from './riskareas_v2.json'

export async function GET() {
  try {
    return NextResponse.json(riskareas?.features)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
