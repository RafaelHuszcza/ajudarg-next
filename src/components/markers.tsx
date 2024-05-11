import { MapPin } from 'lucide-react'
import { Marker as LMarker, Popup } from 'react-leaflet'

import { Marker } from './maps'
import { Button } from './ui/button'
import { SelectSeparator } from './ui/select'
import { LogosWhatsappIcon } from './wppIcon'
interface MarkerProps {
  blueIcon: L.Icon
  redIcon: L.Icon
  goldIcon: L.Icon
  markers: Marker[]
}
export function Markers({ markers, blueIcon, redIcon, goldIcon }: MarkerProps) {
  const formatDate = (dateString: Date) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    // Change locale and options as needed
    return date.toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }
  const verifyMarkerType = (type: string) => {
    if (type.toLowerCase().includes('abrigo')) {
      return goldIcon
    }
    if (type.toLowerCase().includes('arrecadação')) {
      return blueIcon
    }
    return redIcon
  }

  return (
    <>
      {markers.length > 0 &&
        markers.map((marker) => {
          return (
            <LMarker
              icon={verifyMarkerType(marker.type)}
              key={marker.name}
              position={[marker.lat, marker.lng]}
            >
              <Popup>
                <header className="flex flex-col gap-1">
                  <h3 className="m-0 p-0 text-center text-lg font-bold text-primary">
                    {marker.type}
                  </h3>
                  <h2 className="m-0 p-0 text-center text-lg font-bold">
                    {marker.name}
                  </h2>
                  <span className="text-md">{marker.address}</span>
                  {marker.responsibleName && (
                    <span className="text-md flex flex-wrap items-center gap-2">
                      {`${marker.responsibleName ? marker.responsibleName : ''} - ${marker.responsibleNumber ? marker.responsibleNumber : ''}`}
                    </span>
                  )}
                  {marker.hours && (
                    <span className="text-md">
                      Horário de funcionamento: {marker.hours}
                    </span>
                  )}
                </header>

                <main className="flex flex-col gap-1  py-2 text-sm">
                  {marker.type.toLowerCase().includes('abrigo') && (
                    <>
                      <SelectSeparator />
                      <h4 className="text-center text-lg font-semibold">
                        Vagas
                      </h4>
                      <div className="flex w-full justify-center gap-2">
                        <Button
                          variant="default"
                          type="button"
                          className="flex-1 cursor-default text-sm font-semibold"
                        >
                          {marker.vacancies} totais
                        </Button>
                        <Button
                          variant="default"
                          type="button"
                          className="flex-1  cursor-default bg-green-500 text-sm font-semibold hover:bg-green-600"
                        >
                          {marker.vacancies - marker.occupation} livres
                        </Button>
                      </div>
                    </>
                  )}

                  {marker.newNeeds && marker.newNeeds.length > 0 && (
                    <>
                      <SelectSeparator />
                      <span className="text-semibold m-0 p-0 text-sm ">
                        Necessidades:
                      </span>
                      <div className="flex flex-col  text-sm font-light">
                        {marker.newNeeds.map((need) => (
                          <div className="flex justify-between" key={need.id}>
                            <span>{need.name}</span>
                            <span>{need.amount}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </main>
                <SelectSeparator />
                <footer className="flex flex-col gap-2">
                  {marker.address && (
                    <Button asChild variant={'default'}>
                      <a
                        target="_blank"
                        className="flex items-center gap-1 text-sm font-semibold !text-background dark:!text-foreground"
                        href={`https://www.google.com/maps/dir//${marker.lat},${marker.lng}/@${marker.lat},${marker.lng},15z`}
                      >
                        Como Chegar
                        <MapPin />
                      </a>
                    </Button>
                  )}
                  {marker.responsibleWpp && (
                    <Button
                      variant="default"
                      className=" flex gap-2 bg-green-500 text-background hover:bg-green-600 dark:text-foreground"
                      asChild
                    >
                      <a
                        target="_blank"
                        href={`https://api.whatsapp.com/send?phone=${marker.WhatsApp}`}
                        className="text-background dark:text-foreground"
                      >
                        Contato WhatsApp
                        <LogosWhatsappIcon className="h-6 w-6"></LogosWhatsappIcon>
                      </a>
                    </Button>
                  )}
                  {marker.updatedAt && (
                    <span className="text-xs text-gray-400">
                      Atualizado em: {formatDate(marker.updatedAt)}
                    </span>
                  )}
                </footer>
              </Popup>
            </LMarker>
          )
        })}
    </>
  )
}
