'use client '

import { useMarkers } from '@/api-uses/markers'

import { Marker } from '../_data/schema'
import { columns } from './columns'
import { DataTable } from './data-table'

export function DataTableClient() {
  const { data: markers, isLoading, isSuccess } = useMarkers()

  return (
    <div className="container h-full min-w-[32rem] py-10">
      {isLoading && <p>Carregando...</p>}
      {isSuccess && (
        <DataTable columns={columns} data={markers as unknown as Marker[]} />
      )}
    </div>
  )
}
