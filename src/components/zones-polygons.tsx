import { LatLngExpression } from 'leaflet'
import * as React from 'react'
import { LayerGroup, LayersControl, Polygon, Popup } from 'react-leaflet'

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

interface PolygonsProps {
  risks: Risks[]
  zones: Zones[]
  setZonesVisible: React.Dispatch<React.SetStateAction<ZonesVisible>>
}

export function ZonesPolygons({
  risks,
  zones,
  setZonesVisible,
}: PolygonsProps) {
  const handleSetVisible = (isVisible: boolean, field: 'risk' | 'impact') => {
    setZonesVisible((state) => ({ ...state, [field]: isVisible }))
  }

  return (
    <>
      <LayersControl position="topright" collapsed={false}>
        <LayersControl.Overlay name="Zonas de risco" checked>
          <LayerGroup
            eventHandlers={{
              add: () => handleSetVisible(true, 'risk'),
              remove: () => handleSetVisible(false, 'risk'),
            }}
          >
            {risks.length > 0 &&
              risks.map((area, index: number) => {
                if (area.geometry.type === 'Polygon') {
                  const positions = area.geometry.coordinates[0].map(
                    (coord) => [coord[1], coord[0]],
                  )

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
                          dangerouslySetInnerHTML={{
                            __html: area.properties.desc,
                          }}
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
              add: () => handleSetVisible(true, 'impact'),
              remove: () => handleSetVisible(false, 'impact'),
            }}
          >
            {zones.length > 0 &&
              true &&
              zones.map((area, index: number) => {
                if (area.geometry.type === 'Polygon') {
                  const positions = area.geometry.coordinates[0].map(
                    (coord) => [coord[1], coord[0]],
                  )

                  return (
                    <Polygon
                      weight={2}
                      fillColor={area.properties.fill}
                      fillOpacity={area.properties['fill-opacity'] * 0.7}
                      opacity={area.properties['stroke-opacity'] * 0.7}
                      color={area.properties.stroke}
                      stroke={true}
                      positions={positions as LatLngExpression[]}
                      key={index}
                    >
                      <Popup>
                        <h3
                          dangerouslySetInnerHTML={{
                            __html: area.properties.desc,
                          }}
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
    </>
  )
}
