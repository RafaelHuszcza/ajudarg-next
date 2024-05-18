'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'

import { Marker } from '../_data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Marker>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('name')}
        </div>
      )
    },
    id: 'name',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('Tipo')}
        </div>
      )
    },
    id: 'Tipo',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'vacancies',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vagas Disponíveis" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('vacancies')}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'occupation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vagas Ocupadas" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('occupation')}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
