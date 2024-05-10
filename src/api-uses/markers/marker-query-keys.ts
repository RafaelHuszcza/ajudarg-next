import { markersRoute } from '../routes'

export const markerQueryKeys = {
  all: [markersRoute],
  details: () => [...markerQueryKeys.all, 'detail'],
  detail: (id: string) => [...markerQueryKeys.details(), id],
}
