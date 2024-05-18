'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { markersRoute } from '../routes'
import { markerQueryKeys } from './marker-query-keys'
import { Marker } from './use-edit-marker'

const createMarkerFn = async (newMarker: Marker) => {
  const response = await apiClient.post(markersRoute, newMarker)
  return response.data
}

export function useCreateMarker() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMarkerFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: markerQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Localização', {
        description: 'Localização criada com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, newMarker, context?: any) => {
      console.log('Error creating new marker', err)
      toast.error('Localização', {
        description: 'Erro ao criar localização',
      })
      queryClient.setQueryData(markerQueryKeys.all, context.previousMarker)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: markerQueryKeys.all })
    },
  })
}
