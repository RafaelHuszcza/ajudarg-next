import { S3 } from 'aws-sdk'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

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
    const data = await request.formData()
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

    const localId = data.get('localId') as string
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

    const s3 = new S3({
      endpoint: process.env.NEXT_PUBLIC_MINIO_URL!,
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY!,
      sslEnabled: true,
      s3ForcePathStyle: true,
    })

    const specie = data.get('specie') as string
    const color = data.get('color') as string
    const size = data.get('size') as string
    const breed = data.get('breed') as string
    const tag = data.get('tag') as string
    const image: File = data.get('image') as File

    if (!image) {
      return NextResponse.json(
        { message: 'A imagem do pet é obirgatória ao criá-lo' },
        { status: 500 },
      )
    }

    const imageId = uuidv4() + '.' + (image.type.split('/')[1] ?? image.type)
    const buffedImage = Buffer.from(await image.arrayBuffer())
    await s3
      .putObject({
        Bucket: 'images',
        Key: imageId,
        Body: buffedImage,
      })
      .promise()
    await prisma.animal.create({
      data: {
        specie,
        color,
        size,
        breed,
        tag,
        imageUrl: process.env.NEXT_PUBLIC_BUCKET_URL! + imageId,
        localId,
      },
    })
    return NextResponse.json({ message: 'Pet cadastrado com sucesso' })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
