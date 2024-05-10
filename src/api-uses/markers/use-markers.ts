import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { markersRoute } from '../routes'
import { markerQueryKeys } from './marker-query-keys'

export function useMarkers() {
  const getMarkersFn = async () => {
    const response = await apiClient.get(`${markersRoute}/list`)
    return response.data
  }
  return useQuery({
    queryKey: markerQueryKeys.all,
    queryFn: () => getMarkersFn(),
    placeholderData: keepPreviousData,
  })
}
