import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/services/auth'

import { AuthForm } from './_components/auth-form'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/configuracoes')
  }
  return <AuthForm />
}
