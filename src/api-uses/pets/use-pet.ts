'use client'
import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { petsRoute } from '../routes'
import { petQueryKeys } from './pet-query-keys'
export function usePet(id: string) {
  const getPetFn = async () => {
    const response = await apiClient.get(`${petsRoute}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: petQueryKeys.detail(id.toString()),
    queryFn: getPetFn,
    retry: 1,
  })
}
