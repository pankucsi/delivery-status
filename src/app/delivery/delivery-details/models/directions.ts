import { Route } from './route'

export interface Directions extends Route {
  endAddress: string
  startAddress: string
  steps: Route[]
}
