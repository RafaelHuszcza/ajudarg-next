'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'

import { Local, Pet } from '../_data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Pet>[] = [
  {
    accessorKey: 'specie',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Espécie" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('specie')}
        </div>
      )
    },
    id: 'specie',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'breed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Raça" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('breed')}
        </div>
      )
    },
    id: 'breed',
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('color')}
        </div>
      )
    },
    id: 'color',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tamanho" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('size')}
        </div>
      )
    },
    id: 'size',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('tag')}
        </div>
      )
    },
    id: 'tag',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'local',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Local" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {(row.getValue('local') as Local).name}
        </div>
      )
    },
    id: 'local',
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
