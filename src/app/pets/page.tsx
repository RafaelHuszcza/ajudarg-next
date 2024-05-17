import { PetsGrid } from './_components/pets-grid'
//const getPhones = async () => {
//  try {
//    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/phones`, {
//      method: 'GET',
//      next: { tags: ['groups'] },
//    })
//    return await response.json()
//  } catch (e) {
//    console.log(e)
//    return []
//  }
//}
export default async function Page() {
  //const phones = await getPhones()
  return (
    <main className="flex flex-1 justify-center p-4 overflow-hidden">
      <PetsGrid />
    </main>
  )
}
