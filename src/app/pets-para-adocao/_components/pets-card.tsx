import { Button } from '@/components/ui/button'
import { LogosWhatsappIcon } from '@/components/wppIcon'

/* eslint-disable @next/next/no-img-element */
type Local = {
  name: string
  address: string
}

export type Pet = {
  id: string
  imageUrl: string
  name: string
  localId: string
  tag: string
  breed: string
  specie: string
  size: string
  color: string
  local: Local
  ownerName: string
  ownerPhone: string
  gender: string
  age: string
}
interface PetCardProps {
  pet: Pet
}
export function PetsCard({ pet }: PetCardProps) {
  return (
    <div className="flex h-[740px] w-full flex-1 flex-col overflow-hidden rounded-md border shadow-md sm:h-[380px] sm:flex-row">
      <img
        src={pet.imageUrl}
        alt={`Imagem de um ${pet.specie} de cor ${pet.color} e raça ${pet.breed}`}
        className="h-1/2 w-full object-cover sm:h-full sm:w-3/5"
      />
      <div className="mt-2 flex flex-col p-2">
        <span className="rounded-md bg-primary px-2 py-0.5">{pet.tag}</span>
        <div className="flex flex-col p-2">
          <h3 className="text-md mt-1 font-bold">Informações detalhadas</h3>
          <span className="pl-2 text-sm">Idade: {pet.age}</span>
          <span className="pl-2 text-sm">Tamanho: {pet.size}</span>
          <span className="pl-2 text-sm">Cor: {pet.color}</span>
          <span className="pl-2 text-sm">
            Raça: {pet.breed ? pet.breed : 'Não definida'}
          </span>
          <span className="pl-2 text-sm">Sexo: {pet.gender}</span>
        </div>
        <div className="flex flex-col p-2">
          <h3 className="text-md mt-1 font-bold">Localização 📍</h3>
          <span className="pl-2 text-sm">Local: {pet.local.name}</span>
          <span className="pl-2 text-sm">Endereço: {pet.local.address}</span>
        </div>
        <div className="flex flex-col p-2">
          <Button
            variant="default"
            className=" flex gap-2 bg-green-500 text-background hover:bg-green-600 dark:text-foreground"
            asChild
          >
            <a
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=${pet.ownerPhone}`}
              className="text-background dark:text-foreground"
            >
              {pet.ownerName} (responsável)
              <LogosWhatsappIcon className="h-6 w-6"></LogosWhatsappIcon>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
