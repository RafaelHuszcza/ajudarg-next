'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { petsRoute } from '../routes'
import { petQueryKeys } from './pet-query-keys'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createPetFn = async (newPet: any) => {
  const response = await apiClient.post(petsRoute, newPet)
  return response.data
}

export function useCreatePet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPetFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: petQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Pet', {
        description: 'Pet criado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, newPet, context?: any) => {
      console.log('Error creating new pet', err)
      toast.error('Pet', {
        description: 'Erro ao criar Pet',
      })
      queryClient.setQueryData(petQueryKeys.all, context.previousPet)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: petQueryKeys.all })
    },
  })
}
