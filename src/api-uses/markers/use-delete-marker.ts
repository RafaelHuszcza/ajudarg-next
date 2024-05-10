'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { markersRoute } from '../routes'
import { markerQueryKeys } from './marker-query-keys'
export function useDeleteMarker() {
  const queryClient = useQueryClient()
  const deleteMarkerFn = async (id: string) => {
    const response = await apiClient.delete(`${markersRoute}/${id}`)
    return response
  }

  return useMutation({
    mutationFn: deleteMarkerFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: markerQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Excluir local', {
        description: 'Local excluído com sucesso',
      })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: markerQueryKeys.all })
      toast.error('Erro ao excluir local', {
        description: 'Erro ao excluir local',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: markerQueryKeys.all })
    },
  })
}
