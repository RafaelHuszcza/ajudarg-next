'use client '

import { usePetsPriv } from '@/api-uses/pets/use-pets-priv'

import { Pet } from '../_data/schema'
import { columns } from './columns'
import { DataTable } from './data-table'

export function DataTableClient() {
  const { data: pets, isLoading, isSuccess } = usePetsPriv()
  return (
    <div className="container h-full min-w-[32rem] py-10">
      {isLoading && <p>Carregando...</p>}
      {isSuccess && (
        <DataTable columns={columns} data={pets as unknown as Pet[]} />
      )}
    </div>
  )
}
