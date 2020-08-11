import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Option } from '../../models/option'
import { PlacesService } from './places.service'

@Injectable({ providedIn: 'root' })
export class PlacesServiceMock implements PlacesService {
  getPlaces(query: string): Observable<Option[]> {
    return of([
      { id: 'Noszvaj, Dobó István u. 10, 3325 Magyarország', name: 'Noszvaj, Dobó István u. 10, 3325 Magyarország' },
      {
        id: 'Miskolc, Tokaji Ferenc u. 51, 3534 Magyarország',
        name: 'Miskolc, Tokaji Ferenc u. 51, 3534 Magyarország',
      },
      {
        id: 'Miskolc, Andrássy Gyula u. 3, 3532 Magyarország',
        name: 'Miskolc, Andrássy Gyula u. 3, 3532 Magyarország',
      },
      { id: 'Nyíregyháza, Kert köz 8, 4400 Magyarország', name: 'Nyíregyháza, Kert köz 8, 4400 Magyarország' },
    ])
  }
}
