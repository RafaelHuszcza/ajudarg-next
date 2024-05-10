import { AddMarkerForm } from '../_components/add-marker-form'

const getMarker = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/markers/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    return await response.json()
  } catch (e) {
    console.log(e)
    return {
      needs: [],
      address: '',
      hours: '',
      WhatsApp: '',
      phone: '',
      meals: 0,
      responsibleEmail: '',
    }
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const defaultValues = await getMarker(id)
  const newNeeds = defaultValues?.needs?.map((item: string) => ({
    value: item,
  }))
  const newDefaultValues = {
    ...defaultValues,

    needs: newNeeds || defaultValues.needs,
  }
  return <AddMarkerForm method="PUT" defaultValues={newDefaultValues} id={id} />
}
