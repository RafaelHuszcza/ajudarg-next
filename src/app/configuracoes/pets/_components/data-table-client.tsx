'use client '

import { usePets } from '@/api-uses/pets'

import { Pet } from '../_data/schema'
import { columns } from './columns'
import { DataTable } from './data-table'

export function DataTableClient() {
  const { data: pets, isLoading, isSuccess } = usePets()
  return (
    <div className="container h-full min-w-[32rem] py-10">
      {isLoading && <p>Carregando...</p>}
      {isSuccess && (
        <DataTable columns={columns} data={pets as unknown as Pet[]} />
      )}
    </div>
  )
}
