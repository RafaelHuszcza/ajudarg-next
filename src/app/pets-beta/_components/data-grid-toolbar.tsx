'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { filters } from '../_data/data'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataGridToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [filter, setFilter] = useState<string>(filters[0].value)

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-1 flex-col items-end space-x-2 sm:flex-row sm:items-center">
        <div className="flex max-w-80 flex-row">
          <Input
            placeholder="Digite o filtro"
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(filter)?.setFilterValue(event.target.value)
            }
            className="mr-2 h-8 w-[150px] bg-background lg:w-[250px]"
          />
          <Select
            defaultValue={filter}
            onValueChange={(e: string) => setFilter(e)}
          >
            <SelectTrigger className="w-48 bg-background ">
              <SelectValue placeholder="Selecione o filtro" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2 flex max-w-80 flex-1 content-start sm:mt-0">
          {isFiltered && (
            <Button
              variant="destructive"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Limpar Filtros
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}

          {!isFiltered && (
            <a
              className="ml-2 text-blue-500 underline"
              href="https://youtube.com/shorts/HXAbY6zklQM?feature=share"
            >
              Não sabe filtrar?
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
