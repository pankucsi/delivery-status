import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Delivery, DeliveryService } from './delivery.service'

@Injectable()
export class DeliveryServiceMock implements DeliveryService {
  findAll(): Observable<Delivery[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Observable<Delivery> {
    throw new Error('Method not implemented.')
  }
  update(id: string, delivery: Partial<Delivery>): void {
    throw new Error('Method not implemented.')
  }
}
