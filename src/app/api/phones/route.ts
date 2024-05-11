// import { hash } from 'bcrypt'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function GET() {
  try {
    const phones = await prisma.phone.findMany()
    return NextResponse.json(phones)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, number, href } = await request.json()
    await prisma.phone.create({
      data: {
        name,
        href,
        number,
      },
    })
    return NextResponse.json({ message: 'Grupo criado com sucesso' })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
export async function PUT() {
  revalidateTag('phones')
  return NextResponse.json({ message: 'Grupo atualizado com sucesso' })
}

// export async function POST() {
//   const phoneData = [
//     {
//       name: 'Defesa Civil - WhatsApp',
//       number: '53 99968-3244',
//       href: 'https://api.whatsapp.com/send?phone=5553999683244',
//     },
//     {
//       name: 'Defesa Civil',
//       number: '53 3233-8460',
//       href: 'tel:+55533233-8460',
//     },
//     {
//       name: 'Defesa Civil',
//       number: '53 3233-8461',
//       href: 'tel:+55533233-8461',
//     },
//     {
//       name: 'Defesa Civil',
//       number: '199',
//       href: 'tel:+199',
//     },
//     {
//       name: 'Polícia Militar',
//       number: '190',
//       href: 'tel:190',
//     },
//     {
//       name: 'Lar Solidário - Animais',
//       number: '53 3232-7276',
//       href: 'tel:+555332327276',
//     },
//     {
//       name: 'Lar Solidário - Animais',
//       number: '53 99945-9476',
//       href: 'tel:+555399945947',
//     },
//   ]

//   await Promise.all(
//     phoneData.map(async (phone) => {
//       await prisma.phone.upsert({
//         where: { number: phone.number },
//         update: {},
//         create: {
//           number: phone.number,
//           name: phone.name,
//           href: phone.href,
//         },
//       })
//     }),
//   )
//   return NextResponse.json({ message: 'Grupos criados com sucesso' })
// }
