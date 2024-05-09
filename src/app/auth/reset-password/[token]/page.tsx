import { redirect } from 'next/navigation'

import { getServerSessionWithAuth } from '@/services/auth'

import { ResetForm } from '../../_components/reset-form'
export default async function Page({ params }: { params: { token: string } }) {
  const session = await getServerSessionWithAuth()
  if (session) {
    redirect('/configuracoes')
  }
  const { token } = params
  if (!token) {
    redirect('/auth')
  }
  return <ResetForm token={token} />
}
