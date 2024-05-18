'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { S3 } from 'aws-sdk'
import { File } from 'buffer'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import z from 'zod'

import { useMarkers } from '@/api-uses/markers'
import { useCreatePet, useEditPet } from '@/api-uses/pets'
import { ErrorMessage } from '@/components/error-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Marker } from '../../locais/_data/schema'

interface FormPet {
  method: 'POST' | 'PUT'
  defaultValues?: {
    specie: string
    color: string
    size: string
    breed: string
    tag: string
    imageUrl: string
    localId: string
  }
}
const formSchema = z
  .object({
    specie: z.string({ required_error: 'Espécie é necessária' }),
    color: z.string({ required_error: 'Cor é necessária' }),
    size: z.string({ required_error: 'Tamanho é necessário' }),
    breed: z.string({ required_error: 'Tamanho é necessário' }).optional(),
    tag: z.string({ required_error: 'Tamanho é necessário' }).optional(),
    image: z.any().optional(),
    imageUrl: z.string().optional(),
    localId: z.string({ required_error: 'O abrigo é obrigatório' }),
  })
  .refine((form) => form.imageUrl || form?.image.length, {
    message: 'Foto é obrigatória',
    path: ['image'],
  })

export type FormData = z.infer<typeof formSchema>
export function AddPetForm({ method, defaultValues }: FormPet) {
  const router = useRouter()

  const { data, isSuccess } = useMarkers()
  const locals = data as Marker[]

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specie: defaultValues?.specie ?? '',
      color: defaultValues?.color ?? '',
      size: defaultValues?.size ?? '',
      breed: defaultValues?.breed ?? '',
      tag: defaultValues?.tag ?? '',
      imageUrl: defaultValues?.imageUrl ?? '',
      localId: defaultValues?.localId ?? '',
    },
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = form
  const createPet = useCreatePet()
  const editPet = useEditPet()
  const onSubmit = handleSubmit(async (data: FormData) => {
    const file: File = data.image[0]
    const s3 = new S3({
      endpoint: process.env.NEXT_PUBLIC_MINIO_URL!,
      accessKeyId: 'VPP0fkoCyBZx8YU0QTjH',
      secretAccessKey: 'iFq6k8RLJw5B0faz0cKCXeQk0w9Q8UdtaFzHuw4J',
      sslEnabled: false,
      s3ForcePathStyle: true,
    })

    try {
      let imageUrl = data.imageUrl
      if (data?.image?.length > 0) {
        const imageId = uuidv4() + '.' + (file.type.split('/')[1] ?? file.type)
        await s3
          .putObject({
            Bucket: 'images',
            Key: imageId,
            Body: file,
          })
          .promise()
        imageUrl = process.env.NEXT_PUBLIC_BUCKET_URL! + imageId
      }

      delete data.image
      const newData: FormData = {
        ...data,
        imageUrl,
      }

      if (method === 'PUT') {
        await editPet.mutateAsync(newData)
        router.push('/configuracoes/pets')
      }
      if (method === 'POST') {
        await createPet.mutateAsync(newData)
        router.push('/configuracoes/pets')
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Card className="mx-auto my-12  h-auto w-full max-w-[90%] border-2 border-primary">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          {method === 'POST' ? 'Cadastrar Pet' : 'Editar Pet'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col  items-center">
        <form
          id="form"
          className="flex max-h-[calc(100vh-20rem)] w-full flex-wrap justify-center gap-4 overflow-auto p-2"
          onSubmit={onSubmit}
        >
          <div className="relative min-w-[277px] space-y-2">
            <Label htmlFor="name">Espécie do pet</Label>
            <Input
              id="specie"
              placeholder="Insira a espécie do pet"
              type="text"
              {...register('specie')}
            />

            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="specie"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="lat">Cor</Label>
            <Input
              id="lat"
              placeholder="Insira a cor do pet"
              {...register('color')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="color"
            />
          </div>

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="lng">Tamanho</Label>
            <Input
              id="lng"
              placeholder="Insira o tamano do pet"
              {...register('size')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="size"
            />
          </div>

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="type">Raça (opcional)</Label>
            <Input
              id="type"
              placeholder="Insira a raça do pet"
              {...register('breed')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="breed"
            />
          </div>

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="type">Tag (opcional)</Label>
            <Input
              id="type"
              placeholder="Insira a Tag do pet"
              {...register('tag')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="tag"
            />
          </div>

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="type">Imagem</Label>
            <Input
              id="type"
              type="file"
              placeholder="Insira a foto do Pet"
              {...register('image')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="image"
            />
          </div>

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="type">Abrigo</Label>
            {isSuccess && (
              <Controller
                control={control}
                name="localId"
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione o abrigo" />
                      </SelectTrigger>
                      <SelectContent>
                        {locals.map((local) => (
                          <SelectItem key={local.id} value={local.id}>
                            {local.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                }}
              />
            )}
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="localId"
            />
          </div>
        </form>
        <Button
          type="submit"
          form="form"
          disabled={isSubmitting}
          className="mt-4  w-full max-w-80"
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : method === 'PUT' ? (
            'Editar'
          ) : (
            'Cadastrar'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
