'use client '

import { usePets } from '@/api-uses/pets'

import { Pets } from '../_data/schema'
import { columns } from './columns'
import { DataGrid } from './data-grid'

export function PetsGridClient() {
  const { data: pets, isLoading, isSuccess } = usePets()
  console.log({ pets, isLoading, isSuccess })
  return (
    <div className="flex w-full flex-1 flex-col p-10">
      {isLoading && <p>Carregando...</p>}
      {isSuccess && (
        <DataGrid columns={columns} data={pets as unknown as Pets[]} />
      )}
    </div>
  )
}
