import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export abstract class DeliveryService {
  abstract findAll(): Observable<Delivery[]>
  abstract findOne(id: string): Observable<Delivery>
  abstract update(id: string, delivery: Partial<Delivery>): void
}

export interface DeliveryShippingAddress {
  city: string
  name: string
  street: string
  zipCode: string
}

export interface Delivery {
  created: Date
  id: string
  name: string
  startLocation: string
  endLocation: string
  status: string
}
