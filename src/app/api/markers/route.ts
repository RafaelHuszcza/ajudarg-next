import { NextResponse } from 'next/server'

// import { z } from 'zod'
// import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function GET() {
  try {
    const markers = await prisma.local.findMany()
    return NextResponse.json(markers)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}

// TODO - With credentials

// export async function POST(request: Request) {
//   const marker = await request.json()

//   const session = await getServerSessionWithAuth()
//   if (!session) {
//     return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
//       status: 401,
//     })
//   }
//   const markerSchema = z.object({
//     email: z
//       .string({ required_error: 'Email é requerido' })
//       .email('Email Inválido'),
//     password: z
//       .string({ required_error: 'Senha é requerida' })
//       .min(1, 'Senha é requerida'),
//   })
//   type FormData = z.infer<typeof markerSchema>

//   const markersValidate: FormData = markerSchema.parse(marker)

//   const { user } = session
//   if (!user) {
//     return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
//       status: 401,
//     })
//   }
//   if (!user.email)
//     return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
//       status: 401,
//     })

//   const userDB = await prisma.user.findFirst({
//     where: { email: user.email },
//     select: { id: true },
//   })

//   await prisma.local.create({
//     data: {
//       name: marker.name,
//       lat: marker.lat,
//       lng: marker.lng,
//       type: marker.type,
//       needs: marker.needs,
//       address: marker.address,
//       vacancies: 0,
//       occupation: 0,
//       responsibleUserId: admin.id,
//       hours: marker.hours,
//     },
//   })
// }

// TODO - Only the responsible
// export async function PUT() {
//   const session = await getServerSessionWithAuth()
//   if (!session) {
//     return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
//       status: 401,
//     })
//   }

//   await prisma.local.update({
//     where: { id: marker.id },
//     data: {
//       name: marker.name,
//       lat: marker.lat,
//       lng: marker.lng,
//       type: marker.type,
//       needs: marker.needs,
//       address: marker.address,
//       vacancies: 0,
//       occupation: 0,
//       responsibleUserId: admin.id,
//       hours: marker.hours,
//     },
//   })
// }

// // just commented code
// export async function POST() {
//   const admin = await prisma.user.findFirst({
//     where: { email: 'rafaelhuszcza@gmail.com' },
//     select: { id: true },
//   })
//   if (!admin) {
//     return NextResponse.json(
//       { message: 'Usuário não encontrado' },
//       { status: 400 },
//     )
//   }
//   const markersData = [
//     {
//       name: 'SMCA',
//       lat: -32.0457632,
//       lng: -52.1143298,
//       type: 'Arrecadação',
//       needs: ['Rações', 'Gaiolas para transporte'],
//       address: 'Av. Buarque de Macedo, 499 - Cidade Nova',
//     },
//     {
//       name: 'Garage58',
//       lat: -32.0362963,
//       lng: -52.1188967,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//         'Colchões',
//         'Gás de cozinha',
//       ],
//       address: 'R. República, 184 - Cidade Nova',
//     },
//     {
//       name: 'Agropecuária Terra Vermelha',
//       lat: -32.0532596,
//       lng: -52.1538474,
//       type: 'Arrecadação',
//       needs: ['Rações'],
//       address: 'R. Cristóvão Pereira, 145 - Vila Sao Miguel',
//     },
//     {
//       name: 'Agropecuária Comercial Ness',
//       lat: -32.082572,
//       lng: -52.158031,
//       type: 'Arrecadação',
//       needs: ['Rações'],
//       address: 'Alameda Uruguay, 72 - Vila Maria Jose',
//     },
//     {
//       name: 'Camping Cassino',
//       lat: -32.1670274,
//       lng: -52.1668979,
//       type: 'Arrecadação',
//       needs: ['Rações'],
//       address: 'Av. Cel. Augusto Cesar Leivas, 66 - Cassino',
//     },
//     {
//       name: 'Prefeitura Municipal de Rio Grande',
//       lat: -32.0308156,
//       lng: -52.0973848,
//       type: 'Arrecadação',
//       needs: ['Rações'],
//       address: '',
//     },
//     {
//       name: 'Partage Shopping Rio Grande',
//       lat: -32.114074,
//       lng: -52.1752862,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//         'Colchões',
//         'Gás de cozinha',
//       ],
//       address: '',
//     },
//     {
//       name: 'Ginásio Lemos Júnior',
//       lat: -32.0388318,
//       lng: -52.0931829,
//       type: 'Abrigo',
//       needs: ['Roupas Íntimas Novas'],
//       address: 'R. Andrades Neves 460',
//     },
//     {
//       name: 'Ginásio Wanda Rocha',
//       lat: -32.1772973,
//       lng: -52.1596698,
//       type: 'Abrigo',
//       needs: [
//         'Bolacha',
//         'Pão',
//         'Margarina',
//         'Leite',
//         'Produtos de Higiene Pessoal',
//       ],
//       address: 'R. Fernando Osório Filho, 201',
//     },
//     {
//       name: 'Escola João de Oliveira Martins - Em Preparo',
//       lat: -32.0757463,
//       lng: -52.1799448,
//       type: 'Abrigo',
//       needs: [''],
//       address: 'R. Irmão Isicio, 125 - Castelo Branco',
//     },
//     {
//       name: 'E.M.E.F. Frederico Ernesto Buchholz',
//       lat: -32.0552734,
//       lng: -52.1331448,
//       type: 'Abrigo',
//       needs: [''],
//       address:
//         'R. Estados Unidos da América do Norte, S/N - Frederico Ernesto Buchholz',
//     },
//     {
//       name: 'Abrigo Fábrica de Cordas (Famílias Atípicas)',
//       lat: -32.047166,
//       lng: -52.115612,
//       type: 'Abrigo',
//       needs: [
//         'Abafadores',
//         'Fraldas',
//         'Gás de Cozinha',
//         'Alimentos não perecíveis',
//         'Água mineral',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//         'Colchões',
//         'Produtos de Higiene Pessoal',
//         'Produtos de Limpeza',
//         'Rações',
//         'Cobertores',
//         'Travesseiros',
//         'Roupas Íntimas Novas',
//         'Bolacha',
//         'Pão',
//         'Margarina',
//         'Leite',
//         'Produtos de Higiene Pessoal',
//       ],
//       address: ' R. Domingos de Almeida, 660 - Cidade Nova',
//       hours: '8h às 22h',
//     },
//     {
//       name: 'Clube Camponês',
//       lat: -32.0214331,
//       lng: -52.282126,
//       type: 'Abrigo<br>Necessita de',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//         'Materiais de Higiene Pessoal',
//       ],
//       address: 'Arraial',
//       icon: 'goldIcon',
//     },
//     {
//       name: 'Praça Rio Grande Shopping Center',
//       lat: -32.0517257,
//       lng: -52.148484,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//         'Gás de Cozinha',
//         'Colchões',
//       ],
//       address: 'R. Jockey Clube, 155 - Vila Prado',
//     },
//     {
//       name: 'NoMallas',
//       lat: -32.0327525,
//       lng: -52.093192,
//       type: 'Arrecadação',
//       needs: ['Roupas/Agasalhos'],
//       address: 'R. Benjamin Constant, 161 - Centro',
//     },
//     {
//       name: 'Brenda Lima',
//       lat: -32.0506426,
//       lng: -52.1182783,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//       ],
//       address: 'Av. Pres. Vargas, 700 - Vila Juncao',
//     },
//     {
//       name: 'Anhanguera Rio Grande',
//       lat: -32.0440129,
//       lng: -52.1043771,
//       type: 'Arrecadação',
//       needs: ['Rações', 'Cobertores', 'Travesseiros'],
//       address: 'Av. Rheingantz, 91',
//     },
//     {
//       name: 'FNP Cassino',
//       lat: -32.178735,
//       lng: -52.163949,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//       ],
//       address: 'Av. Osvaldo Cruz, 358 - Cassino',
//     },
//     {
//       name: 'Galeto Caxias',
//       lat: -32.174731,
//       lng: -52.1677,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//       ],
//       address: 'R. Jovem Airton Porto Alegre, 351',
//       hours: '8h às 15h - 18h às 22h',
//     },
//     {
//       name: 'De Borest Beach Bar',
//       lat: -32.181566,
//       lng: -52.15697,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//       ],
//       address: 'Av. Atlântica, 244 - Cassino',
//     },
//     {
//       name: 'Open Beach Sports',
//       lat: -32.173833,
//       lng: -52.172147,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//       ],
//       address: 'Av. Rio Grande, 679 - Cassino',
//     },
//     {
//       name: 'Secretaria Municipal Cassino',
//       lat: -32.185648,
//       lng: -52.158539,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//       ],
//       address: 'R. Prof. Fernando Eduardo Freire, 412 - Cassino',
//     },
//     {
//       name: 'Web MultiMarcas',
//       lat: -32.048124,
//       lng: -52.114267,
//       type: 'Arrecadação',
//       needs: ['Roupas de cama e banho', 'Itens de higiene'],
//       address: 'R. Domingos de Almeida, 733 - Parque Res. Coelho',
//     },
//     {
//       name: 'Brown Brownie',
//       lat: -32.041964,
//       lng: -52.110166,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene',
//         'Roupas/agasalhos',
//       ],
//       address: 'R. Gen. Abreu, 268 - Miguel de Castro Moreira',
//     },
//     {
//       name: 'Cruz Vermelha',
//       lat: -32.033959,
//       lng: -52.094959,
//       type: 'Ponto de voluntarização',
//       needs: ['Voluntários'],
//       address: 'R. Zalony, 243 - Centro',
//     },
//     {
//       name: 'Mitra Diocesana',
//       lat: -32.038267,
//       lng: -52.101185,
//       type: 'Arrecadação',
//       needs: [
//         'Água mineral',
//         'Alimentos não perecíveis',
//         'Roupas de cama e banho',
//         'Itens de higiene Roupas/agasalhos',
//       ],
//       address: 'R. João Alfredo, 532 - Centro',
//     },
//     {
//       name: 'Mude Academia',
//       lat: -32.184541,
//       lng: -52.158654,
//       type: 'Arrecadação',
//       needs: [
//         'Roupas',
//         'Produtos de Higiene',
//         'Produtos de Higiene Pessoal',
//         'Colchões e roupas de cama',
//         'Doações em geral',
//       ],
//       address: 'Av. Rio Grande, 98 - Cassino',
//     },
//     {
//       name: 'Ipiranga Atlético Clube (IAC)',
//       lat: -32.039188,
//       lng: -52.0915191,
//       type: 'Arrecadação',
//       needs: ['Doação de Alimentos'],
//       address: ' R. Dr. Nascimento, 14 - Centro',
//       hours: 'Até as 22h',
//     },
//     {
//       name: 'EMEI Vila da Quinta',
//       lat: -32.072051,
//       lng: -52.257759,
//       type: 'Abrigo',
//       needs: [''],
//       address: 'R. João Moreira, 204 - Quinta',
//     },
//     {
//       name: 'CTG Mate Amargo',
//       lat: -32.072587,
//       lng: -52.152602,
//       type: 'Abrigo',
//       needs: [
//         'Voluntários',
//         'Produtos de Limpeza',
//         'Sacos de Lixo 50 e 100l',
//         'Colchões e roupas de cama',
//         'Roupas Íntimas Novas',
//         'Alimentos em Geral',
//       ],
//       address: 'Av. Itália, 1532',
//     },
//     {
//       name: 'Sindicato Rural',
//       lat: -32.048891,
//       lng: -52.140294,
//       type: 'Abrigo para animais',
//       needs: [
//         'Caixas de Papelão',
//         'Toalhas',
//         'Cobertas ou tecidos quentes',
//         'Rações',
//         'Rações Filhotes',
//         'Sachês',
//         'Medicamentos',
//         'Caminhas para cachorros',
//         'Potes e pratinhos',
//       ],
//       address: 'R. Hónorato Carvalho, 1445',
//       hours: '24 horas',
//     },
//   ]
//   await Promise.all(
//     markersData.map(async (marker) => {
//       await prisma.local.upsert({
//         where: { name: marker.name },
//         update: {},
//         create: {
//           name: marker.name,
//           lat: marker.lat,
//           lng: marker.lng,
//           type: marker.type,
//           needs: marker.needs,
//           address: marker.address,
//           vacancies: 0,
//           occupation: 0,
//           responsibleUserId: admin.id,
//           hours: marker.hours,
//         },
//       })
//     }),
//   )
//   return NextResponse.json({ message: 'Grupos criados com sucesso' })
// }
