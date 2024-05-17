type Local = {
    name: string
    address: string
}

  type Pet = {
    id:       string
    imageUrl: string
    name:     string
    localId:  string
    tag:      string
    breed:    string
    specie:   string
    size:     string
    color:    string
    local: Local
  }
  interface PetCardProps {
    pet: Pet
  }
  export function PetsCard(
    { pet }: PetCardProps
  ) {
    return (
      <div className="h-[540px] sm:h-[320px] w-full flex-1 rounded-md border overflow-hidden shadow-md flex flex-col sm:flex-row">
        <img 
            src={pet.imageUrl} 
            alt={`Imagem de um ${pet.specie} de cor ${pet.color} e raça ${pet.breed}`} 
            className="w-full sm:w-3/5 sm:h-full h-1/2 object-cover"
        />
        <div className="flex flex-col p-2 mt-2">
            <span className="bg-primary px-2 py-0.5 rounded-md">
                {pet.specie}
            </span>
            <div className="flex flex-col p-2">
                <h3 className="text-md mt-1 font-bold">Informações detalhadas</h3>
                <span className="pl-2 text-sm">Tamanho: {pet.size}</span>
                <span className="pl-2 text-sm">Cor: {pet.color}</span>
                <span className="pl-2 text-sm">Raça: {pet.breed ? pet.breed : 'Não definida'}</span>
                <span className="pl-2 text-sm">Tag: {pet.tag ? pet.tag : 'Não definida'}</span>
            </div>
            <div className="flex flex-col p-2">
                <h3 className="text-md mt-1 font-bold">Localização 📍</h3>
                <span className="pl-2 text-sm">Este Pet se encontra no abrigo {pet.local.name}</span>
                <span className="pl-2 text-sm">Endereço: {pet.local.address}</span>
            </div>
        </div>
      </div>
    )
  }