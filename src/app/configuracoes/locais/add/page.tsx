import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'


import { AddMarkerForm } from './_components/add-marker-form'

export default async function Page() {
    return <AddMarkerForm method="POST" />

}
