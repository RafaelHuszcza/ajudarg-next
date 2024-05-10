'use client'
import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { markersRoute } from '../routes'
import { markerQueryKeys } from './marker-query-keys'
export function useMarker(id: string) {
  const getMarkerFn = async () => {
    const response = await apiClient.get(`${markersRoute}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: markerQueryKeys.detail(id.toString()),
    queryFn: getMarkerFn,
    retry: 1,
  })
}
