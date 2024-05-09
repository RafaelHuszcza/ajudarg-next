import { redirect } from 'next/navigation'

import { getServerSessionWithAuth } from '@/services/auth'

import { ForgotPasswordForm } from '../_components/forgot-form'

export default async function Page() {
  const session = await getServerSessionWithAuth()
  if (session) {
    redirect('/configuracoes')
  }
  return <ForgotPasswordForm />
}
