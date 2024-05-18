'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { petsRoute } from '../routes'
import { petQueryKeys } from './pet-query-keys'
export interface Pet {
  specie: string
  color: string
  size: string
  imageUrl?: string
  breed?: string
  tag?: string
  localId: string
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
      toast.success('Pet', {
        description: 'Pet editado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, newPet, context?: any) => {
      console.log('Error creating new pet', err)
      toast.error('Pet', {
        description: 'Erro ao editar Pet',
      })
      queryClient.setQueryData(petQueryKeys.all, context.previousPet)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: petQueryKeys.all })
    },
  })
}
