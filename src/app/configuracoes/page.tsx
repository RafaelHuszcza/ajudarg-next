import { columns } from './locais/_components/columns'
import { DataTable } from './locais/_components/data-table'

const getMarkers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/markers/list`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    return await response.json()
  } catch (e) {
    console.log(e)
    return []
  }
}
export default async function Page() {
  const markers = await getMarkers()
  return (
    <div className="container h-full min-w-[32rem] py-10">
      <DataTable columns={columns} data={markers} />
    </div>
  )
}
