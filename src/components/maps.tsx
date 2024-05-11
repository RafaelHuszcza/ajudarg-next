'use client'

import 'leaflet/dist/leaflet.css'

import L, { LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { Button } from './ui/button'
import { LogosWhatsappIcon } from './wppIcon'

type Markers = {
  lat: number
  lng: number
  name: string
  type: string
  needs: string[]
  address: string
  WhatsApp?: string
  meals?: number
  phone?: string
  hours?: string
  vacancies: number
  occupation: number
  updatedAt: Date
}
type Risks = {
  type: string
  properties: {
    desc: string
    fill: string
    'fill-opacity': number
    stroke: string
    'stroke-opacity': number
  }
  geometry: {
    type: string
    coordinates: number[][][]
  }
}

interface MapsProps {
  markers: Markers[]
  risks: Risks[]
}

const Map = ({ markers, risks }: MapsProps) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoord([position.coords.latitude, position.coords.longitude])
      })
    }
  }, [])
  const [coord, setCoord] = useState<LatLngExpression>([
    -32.0453936, -52.1160472,
  ])
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
  function getIcon(color: string) {
    return new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' +
        color +
        '.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }
  const BlueIcon = getIcon('blue')
  const GoldIcon = getIcon('gold')
  const RedIcon = getIcon('red')
  const [marketOpen, setMarkerOpen] = useState<Markers | null>(null)
  const closeMarket = () => {
    setMarkerOpen(null)
  }
  console.log(markers)
  return (
    <>
      <Sheet open={!!marketOpen} onOpenChange={closeMarket}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>aaaa</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <MapContainer className="z-10 h-full w-full" center={coord} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

    <div id="legend" className="absolute bottom-0 right-0 z-[999] m-10 mb-50 bg-background text-foreground rounded-lg p-3 shadow-md">
      <ul>
        <li className="font-semibold flex items-center pb-1">
          <img src={BlueIcon.options.iconUrl} alt="Blue Icon" className="w-3 h-4 mr-2"/>
          Arrecadação
        </li>
        <li className="font-semibold flex items-center pb-1">
        <img src={GoldIcon.options.iconUrl} alt="Gold Icon" className="w-3 h-4 mr-2"/>
          Abrigo
        </li>
        <li className="font-semibold flex items-center pb-1">
        <img src={RedIcon.options.iconUrl} alt="Red Icon" className="w-3 h-4 mr-2"/>
          Ponto de voluntarização
        </li>
        <li className="font-semibold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-4 h-5 mr-1"
          >
            <path
              fill="#ff7575"
              d="M20 2H4c-1.1 0-2 .9-2 2v16a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2M4 6l2-2h4.9L4 10.9zm0 7.7L13.7 4h4.9L4 18.6zM20 18l-2 2h-4.9l6.9-6.9zm0-7.7L10.3 20H5.4L20 5.4z"
            />
          </svg>
          Área de Risco
        </li>
      </ul>
    </div>

        {risks.length > 0 &&
          risks.map((area, index: number) => {
            if (area.geometry.type === 'Polygon') {
              const positions = area.geometry.coordinates[0].map((coord) => [
                coord[1],
                coord[0],
              ])

              return (
                <Polygon
                  weight={2}
                  fillColor={area.properties.fill}
                  fillOpacity={area.properties['fill-opacity'] * 0.5}
                  opacity={area.properties['stroke-opacity'] * 0.5}
                  color={area.properties.stroke}
                  stroke={true}
                  positions={positions as LatLngExpression[]}
                  key={index}
                >
                  <Popup>
                    <h3
                      dangerouslySetInnerHTML={{ __html: area.properties.desc }}
                    />
                  </Popup>
                </Polygon>
              )
            }
            return null
          })}
        {markers.length > 0 &&
          markers.map((marker) => {
            // const x = {
            //   WhatsApp: '53992411640',
            //   phone: '53992411640',
            // }
            return (
              <Marker
                icon={
                  marker.type === 'Ponto de voluntarização'
                    ? RedIcon
                    : marker.type === 'Abrigo'
                      ? GoldIcon
                      : BlueIcon
                }
                // eventHandlers={{
                //   click: () => {
                //     setMarkerOpen(marker)
                //   },
                // }}
                key={marker.name}
                position={[marker.lat, marker.lng]}
              >
                <Popup>
                  <header className="relative text-center text-lg font-bold">
                    <h3>{marker.type}</h3>
                    <h2 className="text-base font-semibold">{marker.name}</h2>
                    <a
                      target="_blank"
                      href={`https://www.google.com/maps/dir//${marker.lat},${marker.lng}/@${marker.lat},${marker.lng},15z`}
                      className="text-sm font-semibold"
                    >
                      {marker.address}
                    </a>
                  </header>

                  <main className="flex flex-col gap-1  py-2 text-sm">
                    {(marker.WhatsApp || marker.phone) && (
                      <span className="m-0 flex items-center gap-1 p-0 ">
                        Contato:
                        <span>{marker.phone}</span>
                        {marker.WhatsApp && marker.phone && <span> e</span>}
                        {marker.WhatsApp && (
                          <Button
                            variant="link"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <a
                              target="_blank"
                              href={`https://api.whatsapp.com/send?phone=${marker.WhatsApp}`}
                            >
                              <LogosWhatsappIcon className="h-8 w-8"></LogosWhatsappIcon>
                            </a>
                          </Button>
                        )}
                      </span>
                    )}
                    {marker.needs.length > 0 && (
                      <>
                        <span className="m-0 p-0 text-sm  ">Necessidades:</span>
                        <ul className=" flex flex-wrap  text-sm font-light">
                          {marker.needs.length > 0 &&
                            marker.needs.map((need, index) => (
                              <li className="text-sm" key={index}>
                                {need}
                                {marker.needs.length - 1 === index ? '' : ', '}
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                    {marker.meals && marker.meals > 0 && (
                      <span className="m-0 p-0 text-sm ">
                        Quantidade de Refeições que precisamos: {marker.meals}
                      </span>
                    )}
                    {marker.hours && (
                      <span className="m-0 p-0 text-sm ">
                        Horário de funcionamento: {marker.hours}
                      </span>
                    )}
                  </main>
                  <footer className="flex flex-col gap-2">
                    {marker.type !== 'Arrecadação' && (
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="default"
                          type="button"
                          className="cursor-default text-sm font-semibold"
                        >
                          {marker.vacancies} vagas disponíveis
                        </Button>
                        <Button
                          variant="destructive"
                          type="button"
                          className="cursor-default text-sm font-semibold"
                        >
                          {marker.occupation} vagas ocupadas
                        </Button>
                      </div>
                    )}
                    {marker.updatedAt && (
                      <span className="text-xs text-gray-400">
                        Atualizado em: {formatDate(marker.updatedAt)}
                      </span>
                    )}
                  </footer>
                </Popup>
              </Marker>
            )
          })}
      </MapContainer>
    </>
  )
}

export default Map
