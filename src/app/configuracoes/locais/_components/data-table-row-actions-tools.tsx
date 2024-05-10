'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Link } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { markersSchema } from '../_data/schema'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const marker = markersSchema.parse(row.original)
  const deleteMarker = async (id: string) => {
    const isConfirmed = window.confirm(
      'Tem certeza de que deseja excluir este local?',
    )

    if (!isConfirmed) {
      return
    }

    try {
      const response = await fetch(`/api/markers/${id}`, {
        method: 'DELETE',
        cache: 'no-cache',
      })

      const data = await response.json()

      if (data.error) {
        toast.error('Erro ao excluir local', {
          description: 'Erro ao excluir local',
        })
        console.error(data.error)
        return
      }

      toast.success('Excluir local', {
        description: 'Local excluído com sucesso',
      })
    } catch (e) {
      console.error('Erro ao excluir local:', e)
      toast.error('Erro ao excluir local', {
        description: 'Ocorreu um erro inesperado',
      })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link
            href={`/configuracoes/local/${marker.id}`}
            className="flex items-center"
          >
            Editar
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => deleteMarker(marker.id)}>Excluir</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
