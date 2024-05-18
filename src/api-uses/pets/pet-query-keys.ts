import { petsRoute } from '../routes'

export const petQueryKeys = {
  all: [petsRoute],
  details: () => [...petQueryKeys.all, 'detail'],
  detail: (id: string) => [...petQueryKeys.details(), id],
}
