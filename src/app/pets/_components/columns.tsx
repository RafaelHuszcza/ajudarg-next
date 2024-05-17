'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Pets } from '../_data/schema'

export const columns: ColumnDef<Pets>[] = [
  {
    accessorKey: 'specie',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'size',

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'color',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'imageUrl',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'local',
    enableSorting: false,
    enableHiding: false,
  },
]
