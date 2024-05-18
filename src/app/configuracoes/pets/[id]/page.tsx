'use client'
import { useRouter } from 'next/navigation'

import { usePet } from '@/api-uses/pets/use-pet'

import { AddPetForm } from '../_components/add-pet-form'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const { data, isLoading, isSuccess, isError } = usePet(id)
  const router = useRouter()

  if (isLoading || !isSuccess) {
    return <div>Carregando...</div>
  }
  if (isError) {
    router.push('/configuracoes/pets')
  }

  return <AddPetForm method="PUT" defaultValues={data} />
}
