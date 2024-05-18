'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { markersRoute } from '../routes'
import { markerQueryKeys } from './marker-query-keys'
export interface Marker {
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
export function useEditMarker() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const editMarkerFn = async (updatedMarker: Marker) => {
    const response = await apiClient.put(`${markersRoute}/${id}`, updatedMarker)
    return response
  }

  return useMutation({
    mutationFn: editMarkerFn,
    onMutate: async (updatedMarker) => {
      await queryClient.cancelQueries({
        queryKey: markerQueryKeys.detail(id.toString()),
      })
      const previousMarker = queryClient.getQueryData(
        markerQueryKeys.detail(id.toString()),
      )
      queryClient.setQueryData(
        markerQueryKeys.detail(id.toString()),
        updatedMarker,
      )
      return { previousMarker, updatedMarker }
    },
    onSuccess: () => {
      toast.success('Localização', {
        description: 'Localização editada com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, newMarker, context?: any) => {
      console.log('Error creating new marker', err)
      toast.error('Localização', {
        description: 'Erro ao editar localização',
      })
      queryClient.setQueryData(markerQueryKeys.all, context.previousMarker)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: markerQueryKeys.all })
    },
  })
}
