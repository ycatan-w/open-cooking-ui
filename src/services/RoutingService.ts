import { toRouteId } from '@/helpers/routing.helper'

export class RoutingService {
  static recipe(id: string) {
    return `/recipes/${toRouteId(id)}`
  }

  static cook(id: string) {
    return `/recipes/${toRouteId(id)}/cook`
  }
}
