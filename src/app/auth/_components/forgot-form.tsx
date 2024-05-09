'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { ErrorMessage } from '@/components/error-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ForgotPasswordForm() {
  const formSchema = z.object({
    email: z.string().email({ message: 'Email Inválido' }),
  })

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      })
      const jsonResponse = await response.json()
      if (response.status === 400 || response.status === 500) {
        toast.error('Email', {
          description: jsonResponse.message,
        })
      }
      if (response.status === 200) {
        toast.success('Email', {
          description: 'Email enviado com sucesso',
        })
        console.log(jsonResponse.message)
      }
    } catch (e) {
      console.log(e)
      toast.error('Email', {
        description: 'Erro ao enviar email',
      })
    }
  })

  return (
    <Card className="mx-auto h-auto w-full max-w-[90%] border-2 border-primary sm:max-w-[30rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Esqueci minha senha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail:</Label>
            <Input
              id="email"
              placeholder="Insira seu email"
              type="text"
              {...register('email')}
            />
            <ErrorMessage className="absolute" errors={errors} name="email" />
          </div>
          <div className="space-y-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                'Recuperar Senha'
              )}
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/auth">Cancelar</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
