// import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

// import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function GET() {
  try {
    const groups = await prisma.group.findMany()
    return NextResponse.json(groups)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
// export async function POST() {
//   const groupData = [
//     {
//       name: 'Voluntários Abrigo EMEF Frederico Ernesto Bucholz',
//       href: 'https://chat.whatsapp.com/HU7QRNsPDKfCEToXfJ6lof',
//     },
//     {
//       name: 'Voluntários Abrigo Ginásio Wanda Rocha',
//       href: 'https://chat.whatsapp.com/CNpDuEBVcFi7sS9aQ4V6aN',
//     },
//     {
//       name: 'Voluntários Abrigo Quiterense',
//       href: 'https://chat.whatsapp.com/KLsh3uTgHXX7mT6VVTpviV',
//     },
//     {
//       name: 'Voluntários para Resgates',
//       href: 'https://chat.whatsapp.com/G0VQtDyBaOx9fb7VIMtv1H',
//     },
//     {
//       name: 'Voluntários Produção de Marmitas Cassino',
//       href: 'https://chat.whatsapp.com/J52QyDw35UM0DZD90lTSNy',
//     },
//     {
//       name: 'Voluntários Resgate de animais',
//       href: 'https://chat.whatsapp.com/LO6VifXdMbh2BaQHdZFnQ4',
//     },
//   ]

//   await Promise.all(
//     groupData.map(async (group) => {
//       await prisma.group.upsert({
//         where: { name: group.name },
//         update: {},
//         create: {
//           name: group.name,
//           href: group.href,
//         },
//       })
//     }),
//   )
//   return NextResponse.json({ message: 'Grupos criados com sucesso' })
// }
