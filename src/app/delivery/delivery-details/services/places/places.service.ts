import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Option } from '../../models/option'

@Injectable()
export abstract class PlacesService {
  abstract getPlaces(query: string): Observable<Option[]>
}
