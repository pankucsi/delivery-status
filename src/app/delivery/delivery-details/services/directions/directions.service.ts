import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Directions } from '../../models/directions'

@Injectable()
export abstract class DirectionsService {
  abstract getDirections(origin: string, destination: string): Observable<Directions>
}
