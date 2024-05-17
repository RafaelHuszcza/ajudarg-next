import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { petsRoute } from '../routes'
import { petQueryKeys } from './pet-query-keys'

export function usePets() {
  // const getPetsFn = async () => {
  //   const response = await apiClient.get(`${petsRoute}`)
  //   return response.data
  // }
  const getMockedData = async () => {
    const pet = [
      {
        id: '123',
        imageUrl:
          'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
        localId: '1',
        tag: 'estrela',
        breed: '',
        name: '',
        specie: 'Gato',
        size: 'Grande',
        color: 'Preto',
        local: {
          name: 'Rural',
          address: 'Rua conde de porto alegre 281',
        },
      },
      {
        id: '1233',
        imageUrl:
          'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
        localId: '1',
        tag: 'estrela',
        breed: '',
        name: '',
        specie: 'Pudle',
        size: 'Grande',
        color: 'Preto',
        local: {
          name: 'Rural',
          address: 'Rua conde de porto alegre 281',
        },
      },
      {
        id: '1234',
        imageUrl:
          'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
        localId: '1',
        tag: 'estrela',
        breed: '',
        name: '',
        specie: 'Cachorro',
        size: 'Grande',
        color: 'Preto',
        local: {
          name: 'Rural',
          address: 'Rua conde de porto alegre 281',
        },
      },
      {
        id: '1235',
        imageUrl:
          'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
        localId: '1',
        tag: 'estrela',
        breed: '',
        name: '',
        specie: 'Gato',
        size: 'Grande',
        color: 'Preto',
        local: {
          name: 'Rural',
          address: 'Rua conde de porto alegre 281',
        },
      },
      {
        id: '123533',
        imageUrl:
          'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
        localId: '1',
        tag: 'estrela',
        breed: '',
        name: '',
        specie: 'Gato',
        size: 'Grande',
        color: 'Preto',
        local: {
          name: 'Rural',
          address: 'Rua conde de porto alegre 281',
        },
      },
      {
        id: '123523',
        imageUrl:
          'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
        localId: '1',
        tag: 'estrela',
        breed: '',
        name: '',
        specie: 'Gato',
        size: 'Grande',
        color: 'Preto',
        local: {
          name: 'Rural',
          address: 'Rua conde de porto alegre 281',
        },
      },
    ]
    return pet
  }
  return useQuery({
    queryKey: petQueryKeys.all,
    queryFn: () => getMockedData(),
    placeholderData: keepPreviousData,
  })
}
