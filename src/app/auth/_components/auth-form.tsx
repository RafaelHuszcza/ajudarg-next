'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { ErrorMessage } from '@/components/error-message'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
export function AuthForm() {
  const router = useRouter()
  const formSchema = z.object({
    email: z
      .string({ required_error: 'Email é requerido' })
      .email('Email Inválido'),
    password: z
      .string({ required_error: 'Senha é requerida' })
      .min(1, 'Senha é requerida'),
  })

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form

  const onSubmit = handleSubmit(async (data: FormData) => {
    const response = await signIn('credentials', { ...data, redirect: false })
    if (response?.error) {
      toast.error('Login', {
        description: 'Credenciais inválidas',
      })
    } else {
      toast.success('Login', {
        description: 'Login realizado com sucesso',
      })
      router.push('/configuracoes')
    }
  })

  return (
    <Card className="mx-auto h-auto w-full max-w-[90%] border-2  border-primary sm:max-w-[30rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="login">E-mail</Label>
            <Input
              id="email"
              placeholder="Insira seu login"
              type="text"
              {...register('email')}
            />
            <ErrorMessage className="absolute" errors={errors} name="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha:</Label>
            <PasswordInput
              id="password"
              placeholder="Insira sua senha"
              {...register('password')}
            />
            <ErrorMessage
              className="absolute"
              errors={errors}
              name="password"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Entrar'
            )}
          </Button>
          <div className="text-center">
            <Link
              className="underline hover:text-primary"
              href="/auth/forgot-password"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
