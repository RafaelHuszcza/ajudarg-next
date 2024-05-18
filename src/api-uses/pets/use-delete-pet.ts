'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { petsRoute } from '../routes'
import { petQueryKeys } from './pet-query-keys'
export function useDeletePet() {
  const queryClient = useQueryClient()
  const deletePetFn = async (id: string) => {
    const response = await apiClient.delete(`${petsRoute}/${id}`)
    return response
  }

  return useMutation({
    mutationFn: deletePetFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: petQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Excluir Pet', {
        description: 'Pet excluído com sucesso',
      })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: petQueryKeys.all })
      toast.error('Erro ao excluir Pet', {
        description: 'Erro ao excluir Pet',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: petQueryKeys.all })
    },
  })
}
