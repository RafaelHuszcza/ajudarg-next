import { S3 } from 'aws-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const petId = params.id
  if (!petId) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

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
  const petDB = await prisma.animal.findFirst({
    where: { id: petId },
    select: { localId: true },
  })
  if (!petDB) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

  const localDB = await prisma.local.findFirst({
    where: {
      id: petDB.localId,
    },
    select: {
      responsibleUserId: true,
    },
  })

  if (localDB?.responsibleUserId !== userDB.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      { status: 401 },
    )
  }

  try {
    const data = await request.formData()
    const image: File = data.get('image') as File
    const imageUrl = data.get('imageUrl') as string
    const specie = data.get('specie') as string
    const color = data.get('color') as string
    const size = data.get('size') as string
    const breed = data.get('breed') as string
    const tag = data.get('tag') as string
    const localId = data.get('localId') as string

    const petSchema = z.object({
      specie: z.string({ required_error: 'Espécie é necessária' }),
      color: z.string({ required_error: 'Cor é necessária' }),
      size: z.string({ required_error: 'Tamanho é necessário' }),
      breed: z.string({ required_error: 'Tamanho é necessário' }).optional(),
      tag: z.string({ required_error: 'Tamanho é necessário' }).optional(),
      imageUrl: z.string(),
      localId: z.string(),
    })
    type FormData = z.infer<typeof petSchema>

    const petValidate: FormData = petSchema.parse({
      data,
      image,
      imageUrl,
      specie,
      color,
      size,
      breed,
      tag,
      localId,
    })

    if (!petValidate) {
      return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
        status: 400,
      })
    }

    const s3 = new S3({
      endpoint: process.env.NEXT_PUBLIC_MINIO_URL!,
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY!,
      sslEnabled: true,
      s3ForcePathStyle: true,
    })

    let newImageUrl = imageUrl
    if (image) {
      const imageId = uuidv4() + '.' + (image.type.split('/')[1] ?? image.type)
      const buffedImage = Buffer.from(await image.arrayBuffer())
      await s3
        .putObject({
          Bucket: 'images',
          Key: imageId,
          Body: buffedImage,
        })
        .promise()

      await s3
        .deleteObject({
          Bucket: 'images',
          Key: imageUrl.split('/').at(-1) as string,
        })
        .promise()

      newImageUrl = process.env.NEXT_PUBLIC_BUCKET_URL! + imageId
    }

    await prisma.animal.update({
      where: { id: petId },
      data: {
        specie,
        color,
        size,
        breed,
        tag,
        imageUrl: newImageUrl,
        localId,
      },
    })

    return NextResponse.json({ message: 'Pet atualizado com sucesso' })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const petId = params.id
  if (!petId) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

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
  const petDB = await prisma.animal.findFirst({
    where: { id: petId },
    select: { localId: true },
  })
  if (!petDB) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }
  const localDB = await prisma.local.findFirst({
    where: {
      id: petDB.localId,
    },
    select: {
      responsibleUserId: true,
    },
  })

  if (localDB?.responsibleUserId !== userDB.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      { status: 401 },
    )
  }

  await prisma.animal.delete({
    where: { id: petId },
  })

  return NextResponse.json({ message: 'Pet deletado com sucesso' })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

  const petId = params.id
  if (!petId) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

  const pet = await prisma.animal.findFirst({
    where: { id: petId },
  })

  if (!pet) {
    return new NextResponse(JSON.stringify({ error: 'Pet não encontrado' }), {
      status: 404,
    })
  }

  interface BFFpet {
    id: string
    specie: string
    color: string
    size: string
    breed: string | null
    tag: string | null
    imageUrl: string
    localId: string
  }

  const data: BFFpet = { ...pet }
  return NextResponse.json(data)
}
