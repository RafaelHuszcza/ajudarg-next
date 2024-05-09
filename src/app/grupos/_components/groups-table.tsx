import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Groups = {
  id: string
  name: string
  href: string
}
interface GroupsTableProps {
  groups: Groups[]
}
export function GroupsTable({ groups }: GroupsTableProps) {
  return (
    <div className="max-h-[calc(100vh-12rem)] w-full  max-w-7xl overflow-auto rounded-md border shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-center text-lg font-bold text-background dark:text-foreground">
              Propósito
            </TableHead>
            <TableHead className="text-center text-lg font-bold text-background dark:text-foreground">
              Grupo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-auto">
          {groups.length > 0 &&
            groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="text-center font-medium">
                  {group.name}
                </TableCell>
                <TableCell className="text- text-center">
                  <a
                    className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                    target="_blank"
                    href={group.href}
                  >
                    Grupo do WhatsApp
                  </a>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell className="flex-1"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
