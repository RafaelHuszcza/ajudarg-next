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

type Markers = {
  lat: number
  lng: number
  name: string
  type: string
  needs: string[]
  address: string
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

        {risks.length > 0 &&
          risks.map((area, index: number) => {
            if (area.geometry.type === 'Polygon') {
              const positions = area.geometry.coordinates[0].map((coord) => [
                coord[1],
                coord[0],
              ])
              console.log(area.properties.fill)
              return (
                <Polygon
                  eventHandlers={{
                    click: () => {
                      console.log(area.properties.desc)
                    },
                  }}
                  weight={2}
                  fillColor={area.properties.fill}
                  fillOpacity={area.properties['fill-opacity'] * 0.5}
                  opacity={area.properties['stroke-opacity'] * 0.5}
                  color={area.properties.stroke}
                  stroke={true}
                  // className="stroke-w-2 fill-red-400 stroke-red-500"

                  positions={positions as LatLngExpression[]}
                  key={index}
                >
                  <Popup>
                    <h3>{area.properties.desc}</h3>
                  </Popup>
                </Polygon>
              )
            }
            return null
          })}
        {markers.length > 0 &&
          markers.map((marker) => {
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
                  <header className="text-center text-lg font-bold">
                    <h3>{marker.type}</h3>
                  </header>
                  <ul className="text-sm font-light">
                    {marker.needs.length > 0 &&
                      marker.needs.map((need, _) => <li key={_}>{need}</li>)}
                  </ul>
                  <p>{marker.name}</p>
                  <footer>
                    <p>{marker.address}</p>
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
