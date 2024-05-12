'use client'
import { useRouter } from 'next/navigation'

import { useMarker } from '@/api-uses/markers/use-marker'

import { AddMarkerForm } from '../_components/add-marker-form'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const { data, isLoading, isSuccess, isError } = useMarker(id)
  const router = useRouter()

  if (isLoading || !isSuccess) {
    return <div>Carregando...</div>
  }
  if (isError) {
    router.push('/configuracoes/locais')
  }
  return <AddMarkerForm method="PUT" defaultValues={data} />
}
