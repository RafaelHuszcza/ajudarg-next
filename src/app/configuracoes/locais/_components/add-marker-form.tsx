'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'

import { useCreateMarker, useEditMarker } from '@/api-uses/markers'
import { ErrorMessage } from '@/components/error-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormMarkers {
  method: 'POST' | 'PUT'
  defaultValues?: {
    name: string
    lat: number
    lng: number
    type: string
    needs: { value: string }[]
    address: string
    hours?: string
    WhatsApp?: string
    phone?: string
    meals?: number
    responsibleEmail: string
  }
}
const formSchema = z.object({
  name: z
    .string({ required_error: 'Nome é necessário' })
    .min(3, { message: 'Nome é necessário' }),
  lat: z.coerce.number({ required_error: 'Latitude é necessária' }),
  lng: z.coerce.number({ required_error: 'Longitude é necessária' }),
  type: z.string({ required_error: 'Tipo é necessário' }).min(3, {
    message: 'Tipo é necessário',
  }),
  needs: z.array(z.object({ value: z.string() })).default([]),
  address: z.string({ required_error: 'Endereço é necessário' }).min(3, {
    message: 'Endereço é necessário',
  }),
  hours: z.string({ required_error: 'Horário é necessário' }).optional(),
  WhatsApp: z.string({ required_error: 'WhatsApp é necessário' }).optional(),
  phone: z.string({ required_error: 'Telefone é necessário' }).optional(),
  meals: z.coerce
    .number()
    .int({ message: 'Refeições é necessário' })
    .optional(),
  responsibleEmail: z
    .string({ required_error: 'Email é necessário' })
    .optional(),
})

export type FormData = z.infer<typeof formSchema>
export function AddMarkerForm({ method, defaultValues }: FormMarkers) {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      lat: defaultValues?.lat ?? 0,
      lng: defaultValues?.lng ?? 0,
      type: defaultValues?.type ?? '',
      needs: defaultValues?.needs ?? [{ value: '' }],
      address: defaultValues?.address ?? '',
      hours: defaultValues?.hours ?? '',
      WhatsApp: defaultValues?.WhatsApp ?? '',
      phone: defaultValues?.phone ?? '',
      meals: defaultValues?.meals ?? 0,
      responsibleEmail: defaultValues?.responsibleEmail ?? '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'needs',
  })
  const addNewNeed = () => {
    append({ value: '' })
  }
  const createMarker = useCreateMarker()
  const editMarker = useEditMarker()
  const onSubmit = handleSubmit(async (data: FormData) => {
    const formattedNeeds = data.needs.map((need) => need.value)
    console.log(formattedNeeds)
    const dataToSend = { ...data, needs: formattedNeeds }
    if (method === 'PUT') {
      editMarker.mutate(dataToSend)
    }
    if (method === 'POST') {
      createMarker.mutate(dataToSend)
    }
  })
  if (editMarker.isSuccess) {
    router.push('/configuracoes/locais')
  }
  if (createMarker.isSuccess) {
    router.push('/configuracoes/locais')
  }
  return (
    <Card className="mx-auto my-12  h-auto   w-full max-w-[90%]   border-2 border-primary">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Criar Localização
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col  items-center">
        <form
          id="form"
          className="flex max-h-[calc(100vh-20rem)] w-full flex-wrap justify-center gap-4 overflow-auto p-2"
          onSubmit={onSubmit}
        >
          <div className="relative min-w-[277px] space-y-2">
            <Label htmlFor="name">Nome do local</Label>
            <Input
              id="name"
              placeholder="Insira o nome da localização"
              type="text"
              {...register('name')}
            />

            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="name"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="lat">Latitude:</Label>
            <Input
              id="lat"
              placeholder="Insira a Latitude do local"
              {...register('lat')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="lat"
            />
          </div>

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="lng">Longitude:</Label>
            <Input
              id="lng"
              placeholder="Insira a Longitude do local"
              {...register('lng')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="lng"
            />
          </div>

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="type">Tipo:</Label>
            <Input
              id="type"
              placeholder="Insira o tipo do local"
              {...register('type')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="type"
            />
          </div>

          {fields.map((field, index) => (
            <div className="min-w-[277px] space-y-2" key={index}>
              <Label htmlFor={`needs-${index}`}>Necessidades</Label>
              <div className="flex w-full gap-2">
                <div className="w-full">
                  <Input
                    id={`needs-${index}`}
                    placeholder="Insira uma necessidade do local"
                    {...register(`needs.${index}.value`)}
                  />
                  <ErrorMessage
                    className="absolute bottom-[-22px] m-0 p-0"
                    errors={errors}
                    name="needs"
                  />
                </div>
                <Button
                  type="button"
                  onClick={
                    index !== 0 ? () => remove(index) : () => addNewNeed()
                  }
                  className="w-12 p-0"
                >
                  {index === 0 ? <Plus className="h-6 w-6" /> : <Trash />}
                </Button>
              </div>
            </div>
          ))}

          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="address">Endereço:</Label>
            <Input
              id="address"
              placeholder="Insira o endereço do local"
              {...register('address')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="address"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="hours">Horário:</Label>
            <Input
              id="hours"
              placeholder="Insira o horário do local"
              {...register('hours')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="hours"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="WhatsApp">WhatsApp:</Label>
            <Input
              id="WhatsApp"
              placeholder="Insira o WhatsApp do local"
              {...register('WhatsApp')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="WhatsApp"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="phone">Telefone:</Label>
            <Input
              id="phone"
              placeholder="Insira o telefone do local"
              {...register('phone')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="phone"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="meals">Refeições:</Label>
            <Input
              type="number"
              id="meals"
              placeholder="Insira a quantidade de refeições do local"
              {...register('meals')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="meals"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="responsibleEmail">Email do responsável:</Label>
            <Input
              id="responsibleEmail"
              placeholder="Insira o email do responsável"
              {...register('responsibleEmail')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="responsibleEmail"
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
