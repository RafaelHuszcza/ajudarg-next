'use client'

import { S3 } from 'aws-sdk'
import { FormEvent, useRef } from 'react'

import { PetsCard } from './pets-card'

type Phone = {
  id: number
  name: string
  number: string
  href: string
}
interface PhonesTableProps {
  phones: Phone[]
}
export function PetsUpload() {
  const pet = {
    id: '123',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
    localId: '1',
    tag: 'estrela',
    breed: '',
    name: '',
    specie: 'Cachorro',
    size: 'Grande',
    color: 'Preto',
    local: {
      name: 'Rural',
      address: 'Rua conde de porto alegre 281',
    },
  }
  const ref = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const files = ref.current?.files

    if (!files || files.length < 1) return
    const s3 = new S3({
      endpoint: 'http://localhost:9000',
      accessKeyId: 'VPP0fkoCyBZx8YU0QTjH',
      secretAccessKey: 'iFq6k8RLJw5B0faz0cKCXeQk0w9Q8UdtaFzHuw4J',
      sslEnabled: false,
      s3ForcePathStyle: true,
    })

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        if (!e.target?.result) return
        console.log(e.target?.result)
        const blob = new Blob([e.target?.result], { type: files[0].type })
        await s3
          .putObject({
            Bucket: 'images',
            Key: '3.png',
            Body: blob,
          })
          .promise()

        console.log(
          await s3
            .getObject({
              Bucket: 'images',
              Key: '3.png',
            })
            .promise(),
        )
      } catch (err) {
        console.log(err)
      }
    }
    console.log(files[0])
    reader.readAsArrayBuffer(files[0])
  }

  return (
    <div className="max-h-[calc(100vh-12rem)] w-full max-w-7xl flex-1 overflow-auto rounded-md border shadow-md">
      <form onSubmit={handleSubmit}>
        <input ref={ref} type="file" />
        <button type="submit">Enviar</button>
      </form>
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        <PetsCard pet={pet} />
        <PetsCard pet={pet} />
        <PetsCard pet={pet} />
        <PetsCard pet={pet} />
        <PetsCard pet={pet} />
      </div>
    </div>
  )
}
