import { GroupsTable } from './_components/groups-table'

export default async function Page() {
  const getGroups = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups`, {
      method: 'GET',
      cache: 'no-cache',
    })
    return await response.json()
  }
  const groups = await getGroups()
  return (
    <main className="flex flex-1 justify-center p-12">
      <GroupsTable groups={groups} />
    </main>
  )
}
