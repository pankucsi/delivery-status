import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../../../../environments/environment'
import { Option } from '../../models/option'
import { PlacesService } from './places.service'

@Injectable()
export class PlacesServiceImpl implements PlacesService {
  constructor(private http: HttpClient) {}

  getPlaces(query: string): Observable<Option[]> {
    return this.http
      .get(`http://localhost:8000/maps/api/place/textsearch/json?query=${query}&key=${environment.key}`)
      .pipe(map((response) => this.convertDTO(response)))
  }

  private convertDTO(response: any): Option[] {
    return response.results.map((result) => ({ name: result.formatted_address, id: result.formatted_address }))
  }
}
