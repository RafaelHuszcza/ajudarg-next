import { redirect } from 'next/navigation'

import { getServerSessionWithAuth } from '@/services/auth'

export default async function Page() {
  const session = await getServerSessionWithAuth()
  if (session) {
    redirect('/configuracoes')
  }
  redirect('/auth')
}
