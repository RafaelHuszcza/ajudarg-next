'use client'

import 'leaflet/dist/leaflet.css'

import L, { LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import { Markers } from './markers'
import { MarkersLegends } from './markers-legends'
import { ZonesPolygons } from './zones-polygons'

export type Marker = {
  lat: number
  lng: number
  name: string
  type: string
  needs: { name: string; amount: number }[] | string[]
  address: string
  WhatsApp?: string
  meals?: number
  phone?: string
  hours?: string
  vacancies: number
  occupation: number
  updatedAt: Date
  responsibleName?: string
  responsibleNumber?: string
  responsibleWpp?: string
  newNeeds?: { id: string; name: string; amount: number }[]
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
type Zones = {
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

type ZonesVisible = {
  risk: boolean
  impact: boolean
}

interface MapsProps {
  markers: Marker[]
  risks: Risks[]
  zones: Zones[]
}

const Map = ({ markers, risks, zones }: MapsProps) => {
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
  const [zonesVisible, setZonesVisible] = useState<ZonesVisible>({
    risk: true,
    impact: false,
  })
  // const closeMarket = () => {
  //   setMarkerOpen(null)
  // }

  return (
    <>
      {/* <Sheet open={!!marketOpen} onOpenChange={closeMarket}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>aaaa</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet> */}
      <MapContainer className="z-10 h-full w-full" center={coord} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkersLegends
          blueIcon={BlueIcon}
          redIcon={RedIcon}
          goldIcon={GoldIcon}
          renderRisks={zonesVisible.risk}
          renderZones={zonesVisible.impact}
        />

        <ZonesPolygons
          risks={risks}
          zones={zones}
          setZonesVisible={setZonesVisible}
        />

        <Markers
          blueIcon={BlueIcon}
          redIcon={RedIcon}
          goldIcon={GoldIcon}
          markers={markers}
        />
      </MapContainer>
    </>
  )
}

export default Map
