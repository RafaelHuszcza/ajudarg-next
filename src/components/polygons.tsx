import * as React from 'react'

import { LayerGroup, LayersControl, Popup, Polygon } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

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

interface PolygonsProps {
  risks: Risks[]
  zones: Zones[]
}

export function Polygons({
  risks,
  zones
}: PolygonsProps) {
  const [impactZonesShown, setImpactZonesShown] = React.useState(false);
  return (
    <>
      <LayersControl position="topright" collapsed={false}>
        <LayersControl.Overlay name="Zonas de risco" checked>
          <LayerGroup>
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
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Zonas de impacto">
          <LayerGroup
          eventHandlers={{
            add: (_) => setImpactZonesShown(true),
            remove: (_) => setImpactZonesShown(false)
          }}>
            {zones.length > 0 && true &&
              zones.map((area, index: number) => {
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
          </LayerGroup>
        </LayersControl.Overlay>     
      </LayersControl>
  
      { impactZonesShown &&
        <div className='absolute z-[999] bottom-20 sm:bottom-0 right-[-20px] w-56 m-10'>
          <img src="/zones-legend.jpg" alt="azul é zona leve, amarelo é zona severa e vermelho é zona extrema" className='rounded-lg' />
        </div>
      }
    </>
  )
}