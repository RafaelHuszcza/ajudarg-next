import dynamic from 'next/dynamic'

const getMarkers = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/markers`, {
      method: 'GET',
      cache: 'no-cache',
    })
    return await response.json()
  } catch (e) {
    console.log(e)
    return []
  }
}
const getRiskAreas = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/risk-areas`,
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
const getImpactZones = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/impact-zones`,
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

const DynamicMap = dynamic(() => import('../components/maps'), {
  ssr: false,
})

export default async function Page() {
  const [markers, riskAreas, impactZones] = await Promise.all([
    getMarkers(),
    getRiskAreas(),
    getImpactZones(),
  ])

  return (
    <main className="h-[calc(100vh-5rem)] w-full">
      <DynamicMap markers={markers} risks={riskAreas} zones={impactZones} />
    </main>
  )
}
