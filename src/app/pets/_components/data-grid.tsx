'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { DataGridToolbar } from './data-grid-toolbar'
import { Pet, PetsCard } from './pets-card'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataGrid<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="h-[80vh] space-y-4">
      <DataGridToolbar table={table} />
      <div className="grid h-[calc(100%-4rem)] w-full grid-cols-1 gap-4 overflow-auto sm:grid-cols-2">
        {table.getRowModel().rows?.length > 0 &&
          table.getRowModel().rows.map((row) => {
            const pet = row.getVisibleCells()[0].row.original as Pet

            return <PetsCard key={row.id} pet={pet} />
          })}
      </div>
    </div>
  )
}
