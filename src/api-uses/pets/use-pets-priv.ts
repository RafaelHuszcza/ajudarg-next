import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { petsRoute } from '../routes'
import { petQueryKeys } from './pet-query-keys'

export function usePetsPriv() {
  const getPetsFn = async () => {
    const response = await apiClient.get(`${petsRoute}/list`)
    return response.data
  }

  return useQuery({
    queryKey: petQueryKeys.all,
    queryFn: () => getPetsFn(),
    placeholderData: keepPreviousData,
  })
}
