import { NextResponse } from 'next/server'

import impactzones from './impactzones.json'

export async function GET() {
  try {
    return NextResponse.json(impactzones?.features)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
