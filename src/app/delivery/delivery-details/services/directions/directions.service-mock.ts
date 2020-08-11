import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Directions } from '../../models/directions'
import { DirectionsService } from './directions.service'

@Injectable()
export class DirectionsServiceMock implements DirectionsService {
  getDirections(origin: string, destination: string): Observable<Directions> {
    return of({
      endAddress: 'Miskolc, Selyemrét u. 20, 3527 Magyarország',
      endLocation: { lat: 48.1009274, lng: 20.8048161 },
      startAddress: 'Miskolc, Széchenyi István út 111, 3525 Magyarország',
      startLocation: { lat: 48.10335, lng: 20.79018 },
      steps: [
        { startLocation: { lat: 48.10335, lng: 20.79018 }, endLocation: { lat: 48.104567, lng: 20.790078 } },
        { startLocation: { lat: 48.104567, lng: 20.790078 }, endLocation: { lat: 48.104538, lng: 20.7898679 } },
        { startLocation: { lat: 48.104538, lng: 20.7898679 }, endLocation: { lat: 48.105237, lng: 20.789858 } },
        { startLocation: { lat: 48.105237, lng: 20.789858 }, endLocation: { lat: 48.105209, lng: 20.790818 } },
        { startLocation: { lat: 48.105209, lng: 20.790818 }, endLocation: { lat: 48.1044989, lng: 20.7913 } },
        { startLocation: { lat: 48.1044989, lng: 20.7913 }, endLocation: { lat: 48.1044506, lng: 20.7977216 } },
        { startLocation: { lat: 48.1044506, lng: 20.7977216 }, endLocation: { lat: 48.1027464, lng: 20.7977953 } },
        { startLocation: { lat: 48.1027464, lng: 20.7977953 }, endLocation: { lat: 48.1020274, lng: 20.8030016 } },
        { startLocation: { lat: 48.1020274, lng: 20.8030016 }, endLocation: { lat: 48.1011213, lng: 20.8033063 } },
        { startLocation: { lat: 48.1011213, lng: 20.8033063 }, endLocation: { lat: 48.1011137, lng: 20.8036 } },
        { startLocation: { lat: 48.1011137, lng: 20.8036 }, endLocation: { lat: 48.1012995, lng: 20.804733 } },
        { startLocation: { lat: 48.1012995, lng: 20.804733 }, endLocation: { lat: 48.1009274, lng: 20.8048161 } },
      ],
    })
  }
}
