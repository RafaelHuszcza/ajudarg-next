'use client'
import { PetsGridClient } from './_components/pets-grid-client'

export default function Page() {
  return (
    <main className="flex w-full flex-1 justify-center overflow-auto">
      <PetsGridClient />
    </main>
  )
}
