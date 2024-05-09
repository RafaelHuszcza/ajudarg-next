'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { ErrorMessage } from '@/components/error-message'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
interface ResetFormProps {
  token: string
}
export function ResetForm({ token }: ResetFormProps) {
  const router = useRouter()

  const formSchema = z
    .object({
      password: z
        .string()
        .min(6, { message: 'A senha precisa de no mínimo 6 caracteres' })
        .regex(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$/, {
          message: 'É necessário 1 caractere especial e 1 número',
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
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
  useEffect(() => {
    if (!token) {
      router.push('/auth')
    }
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })
        const jsonResponse = await response.json()
        if (response.status === 400) {
          toast.error('Token', {
            description: jsonResponse.message,
          })
          router.push('/auth/forgot-password')
        }
        if (response.status === 200) {
          toast.success('Token', {
            description: 'Token válido',
          })
        }
      } catch (e) {
        toast.error('Token', {
          description: 'Erro Ao verificar token, tente novamente',
        })

        router.push('/auth/forgot-password')
      }
    }
    verifyToken()
  }, [router, token])

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      const jsonResponse = await response.json()
      if (response.status === 401) {
        toast.error('Token', {
          description: jsonResponse.message,
        })
        router.push('/auth/forgot-password')
      }
      if (response.status === 400 || response.status === 500) {
        toast.error('Alteração de Senha', {
          description: jsonResponse.message,
        })
        router.push('/auth/forgot-password')
      }
      if (response.status === 200) {
        toast.success('Alteração de Senha', {
          description: 'Senha alterada com sucesso',
        })
        router.push('/auth')
      }
    } catch (e) {
      toast.success('Alteração', {
        description: 'Erro ao alterar senha, tente novamente',
      })
      router.push('/auth/forgot-password')
    }
  })

  return (
    <Card className="mx-auto h-auto w-full max-w-[90%] border-2   border-primary sm:max-w-[30rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Criar Nova Senha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha:</Label>
            <PasswordInput
              id="password"
              placeholder="Insira sua nova senha"
              {...register('password')}
            />
            <ErrorMessage
              className="absolute max-w-[80%]"
              errors={errors}
              name="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha:</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirme sua nova senha"
              {...register('confirmPassword')}
            />
            <ErrorMessage
              className="absolute"
              errors={errors}
              name="confirmPassword"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Alterar Senha'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
