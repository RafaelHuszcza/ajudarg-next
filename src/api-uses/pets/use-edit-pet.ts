'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { petsRoute } from '../routes'
import { petQueryKeys } from './pet-query-keys'
export interface Pet {
  name: string
  lat: number
  lng: number
  type: string
  needs: { name: string; amount: number }[]
  address: string
  hours?: string
  WhatsApp?: string
  phone?: string
  meals?: number
  responsibleEmail?: string
  newNeeds?: { name: string; amount: number }[]
}
export function useEditPet() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const editPetFn = async (updatedPet: Pet) => {
    const response = await apiClient.put(`${petsRoute}/${id}`, updatedPet)
    return response
  }

  return useMutation({
    mutationFn: editPetFn,
    onMutate: async (updatedPet) => {
      await queryClient.cancelQueries({
        queryKey: petQueryKeys.detail(id.toString()),
      })
      const previousPet = queryClient.getQueryData(
        petQueryKeys.detail(id.toString()),
      )
      queryClient.setQueryData(petQueryKeys.detail(id.toString()), updatedPet)
      return { previousPet, updatedPet }
    },
    onSuccess: () => {
      toast.success('Localização', {
        description: 'Localização editada com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, newPet, context?: any) => {
      console.log('Error creating new pet', err)
      toast.success('Localização', {
        description: 'Erro ao editar localização',
      })
      queryClient.setQueryData(petQueryKeys.all, context.previousPet)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: petQueryKeys.all })
    },
  })
}
