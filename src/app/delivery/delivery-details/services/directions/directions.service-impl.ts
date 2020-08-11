import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { environment } from '../../../../../environments/environment'
import { Directions } from '../../models/directions'
import { DirectionsService } from './directions.service'

@Injectable()
export class DirectionsServiceImpl implements DirectionsService {
  constructor(private http: HttpClient) {}

  getDirections(origin: string, destination: string): Observable<Directions> {
    const encodedURI = encodeURI(
      `http://localhost:8000/maps/api/directions/json?origin=${origin}&destination=${destination}&fields=routes&key=${environment.key}`,
    )

    return this.http.get(encodedURI).pipe(map((response) => this.convertDTO(response)))
  }

  private convertDTO(response: any): Directions {
    const {
      end_address: endAddress,
      start_address: startAddress,
      end_location: endLocation,
      start_location: startLocation,
      steps,
    } = response.routes[0].legs[0]
    return {
      endAddress,
      endLocation,
      startAddress,
      startLocation,

      steps: steps.map((step) => ({ startLocation: step.start_location, endLocation: step.end_location })),
    }
  }
}
