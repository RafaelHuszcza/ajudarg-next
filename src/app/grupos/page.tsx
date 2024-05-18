import { GroupsTable } from './_components/groups-table'
const getGroups = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
      method: 'GET',
      next: { tags: ['groups'] },
    })
    return await response.json()
  } catch (e) {
    console.log(e)
    return []
  }
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <main className="flex flex-1 justify-center p-12">
      <GroupsTable groups={groups} />
    </main>
  )
}
