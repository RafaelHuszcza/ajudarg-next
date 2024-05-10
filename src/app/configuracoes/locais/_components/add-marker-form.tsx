'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

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
    needs: string[]
    address: string
    hours?: string
    WhatsApp?: string
    phone?: string
    meals?: number
    responsibleEmail: string
  }
  id?: string
}

export function AddMarkerForm({ id, method, defaultValues }: FormMarkers) {
  const router = useRouter()
  const formSchema = z.object({
    name: z.string({ required_error: 'Nome é necessário' }),
    lat: z.coerce.number({ required_error: 'Latitude é necessária' }),
    lng: z.coerce.number({ required_error: 'Longitude é necessária' }),
    type: z.string({ required_error: 'Tipo é necessário' }),
    needs: z
      .array(z.string({ required_error: 'Necessidades são necessárias' }))
      .default([]),
    address: z.string({ required_error: 'Endereço é necessário' }),
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

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      lat: defaultValues?.lat ?? 0,
      lng: defaultValues?.lng ?? 0,
      type: defaultValues?.type ?? '',
      needs: defaultValues?.needs ?? [],
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

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const response = await fetch(
        `/api/markers/${method === 'PUT' ? id : ''}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      const responseJson = await response.json()
      if (response.ok) {
        toast.success('Localização', {
          description: responseJson.message,
        })
        router.push('/configuracoes/locais')
      }
      if (response.status === 400) {
        toast.error('Localização', {
          description: responseJson.message,
        })
      }
    } catch (e) {
      console.log(e)
      toast.error('Localização', {
        description: 'Erro no servidor',
      })
    }
  })

  return (
    <Card className="mx-auto h-auto w-full max-w-[90%] border-2  border-primary sm:max-w-[30rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Criar Localização
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do local</Label>
            <Input
              id="name"
              placeholder="Insira o nome da localização"
              type="text"
              {...register('name')}
            />
            <ErrorMessage className="absolute" errors={errors} name="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lat">Latitude:</Label>
            <Input
              id="lat"
              placeholder="Insira a Latitude do local"
              {...register('lat')}
            />
            <ErrorMessage className="absolute" errors={errors} name="lat" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lng">Longitude:</Label>
            <Input
              id="lng"
              placeholder="Insira a Longitude do local"
              {...register('lng')}
            />
            <ErrorMessage className="absolute" errors={errors} name="lng" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo:</Label>
            <Input
              id="type"
              placeholder="Insira o tipo do local"
              {...register('type')}
            />
            <ErrorMessage className="absolute" errors={errors} name="type" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="needs">Necessidades:</Label>
            <Input
              id="needs"
              placeholder="Insira as necessidades do local"
              {...register('needs')}
            />
            <ErrorMessage className="absolute" errors={errors} name="needs" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço:</Label>
            <Input
              id="address"
              placeholder="Insira o endereço do local"
              {...register('address')}
            />
            <ErrorMessage className="absolute" errors={errors} name="address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Horário:</Label>
            <Input
              id="hours"
              placeholder="Insira o horário do local"
              {...register('hours')}
            />
            <ErrorMessage className="absolute" errors={errors} name="hours" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="WhatsApp">WhatsApp:</Label>
            <Input
              id="WhatsApp"
              placeholder="Insira o WhatsApp do local"
              {...register('WhatsApp')}
            />
            <ErrorMessage
              className="absolute"
              errors={errors}
              name="WhatsApp"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone:</Label>
            <Input
              id="phone"
              placeholder="Insira o telefone do local"
              {...register('phone')}
            />
            <ErrorMessage className="absolute" errors={errors} name="phone" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meals">Refeições:</Label>
            <Input
              type="number"
              id="meals"
              placeholder="Insira a quantidade de refeições do local"
              {...register('meals')}
            />
            <ErrorMessage className="absolute" errors={errors} name="meals" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsibleEmail">Email do responsável:</Label>
            <Input
              id="responsibleEmail"
              placeholder="Insira o email do responsável"
              {...register('responsibleEmail')}
            />
            <ErrorMessage
              className="absolute"
              errors={errors}
              name="responsibleEmail"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
