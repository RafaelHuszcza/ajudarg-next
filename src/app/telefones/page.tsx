import { PhonesTable } from './_components/phones-table'
const getPhones = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/phones`, {
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
  const phones = await getPhones()
  return (
    <main className="flex flex-1 justify-center p-12">
      <PhonesTable phones={phones} />
    </main>
  )
}
