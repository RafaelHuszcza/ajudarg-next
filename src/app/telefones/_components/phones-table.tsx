import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Phone = {
  id: number
  name: string
  number: string
  href: string
}
interface PhonesTableProps {
  phones: Phone[]
}
export function PhonesTable({ phones }: PhonesTableProps) {
  return (
    <div className="max-h-[calc(100vh-12rem)] w-full max-w-7xl  flex-1 overflow-auto rounded-md border shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-center text-lg font-bold text-background dark:text-foreground">
              Órgão
            </TableHead>
            <TableHead className="text-center text-lg font-bold text-background dark:text-foreground">
              Numero
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {phones.map((phone) => (
            <TableRow key={phone.id}>
              <TableCell className="text-center font-medium">
                {phone.name}
              </TableCell>
              <TableCell className="text- text-center">
                <a
                  className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                  href={phone.href}
                >
                  {phone.number}
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
