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
    needs: { name: string; amount: number }[]
    address: string
    hours?: string
    WhatsApp?: string
    phone?: string
    vacancies: number
    occupation: number
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
  needs: z
    .array(z.object({ name: z.string(), amount: z.coerce.number().default(0) }))
    .default([]),
  address: z.string({ required_error: 'Endereço é necessário' }).min(3, {
    message: 'Endereço é necessário',
  }),
  hours: z.string({ required_error: 'Horário é necessário' }).optional(),
  WhatsApp: z.string({ required_error: 'WhatsApp é necessário' }).optional(),
  phone: z.string({ required_error: 'Telefone é necessário' }).optional(),
  responsibleEmail: z
    .string({ required_error: 'Email é necessário' })
    .optional(),
  vacancies: z.coerce.number({ required_error: 'Vagas é necessário' }),
  occupation: z.coerce.number({
    required_error: 'Vagas ocupadas é necessário',
  }),
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
      needs: defaultValues?.needs
        ? defaultValues?.needs.length > 0
          ? defaultValues?.needs
          : [{ name: '', amount: 0 }]
        : [{ name: '', amount: 0 }],
      address: defaultValues?.address ?? '',
      hours: defaultValues?.hours ?? '',
      WhatsApp: defaultValues?.WhatsApp ?? '',
      phone: defaultValues?.phone ?? '',
      responsibleEmail: defaultValues?.responsibleEmail ?? '',
      vacancies: defaultValues?.vacancies ?? 0,
      occupation: defaultValues?.occupation ?? 0,
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
    append({ name: '', amount: 0 })
  }
  const createMarker = useCreateMarker()
  const editMarker = useEditMarker()
  const onSubmit = handleSubmit(async (data: FormData) => {
    const newNeeds = data.needs.filter((need) => need.name !== '')
    data.needs = newNeeds
    try {
      if (method === 'PUT') {
        await editMarker.mutateAsync(data)
        router.push('/configuracoes/locais')
      }
      if (method === 'POST') {
        await createMarker.mutateAsync(data)
        router.push('/configuracoes/locais')
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Card className="mx-auto my-12  h-auto   w-full max-w-[90%]   border-2 border-primary">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          {method === 'POST' ? 'Cadastrar Local' : 'Editar Local'}
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
            <div className="max-w-[277px] space-y-2" key={index}>
              <Label htmlFor={`needs-${index}`}>Necessidades</Label>
              <div className="flex w-full gap-2">
                <div className="w-full min-w-0">
                  <Input
                    className="w-full"
                    id={`needs-${index}`}
                    placeholder="Insira uma necessidade do local"
                    {...register(`needs.${index}.name`)}
                  />
                  <ErrorMessage
                    className="absolute bottom-[-22px] m-0 p-0"
                    errors={errors}
                    name="needs"
                  />
                </div>
                <Input
                  className="w-20 min-w-0"
                  type="number"
                  id={`needs-${index}`}
                  placeholder="Quantidade"
                  {...register(`needs.${index}.amount`)}
                />
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
            <Label htmlFor="vacancies">Vagas Disponíveis</Label>
            <Input
              type="number"
              id="vacancies"
              placeholder="Insira as vagas disponíveis no local"
              {...register('vacancies')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="vacancies"
            />
          </div>
          <div className="relative  min-w-[277px] space-y-2">
            <Label htmlFor="occupation">Vagas Ocupadas</Label>
            <Input
              type="number"
              id="occupation"
              placeholder="Insira as vagas ocupadas no local"
              {...register('occupation')}
            />
            <ErrorMessage
              className="absolute bottom-[-22px] m-0 p-0"
              errors={errors}
              name="vacancies"
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
