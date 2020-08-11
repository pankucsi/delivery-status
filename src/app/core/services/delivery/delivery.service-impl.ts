import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Delivery, DeliveryService } from './delivery.service'

@Injectable()
export class DeliveryServiceImpl implements DeliveryService {
  private deliveriesRef = this.afs.collection<DeliveryDTO>('deliveries')

  constructor(private afs: AngularFirestore) {}

  update(id: string, delivery: Partial<Delivery>): void {
    this.deliveriesRef.doc(id).update(delivery)
  }

  findAll(): Observable<Delivery[]> {
    return this.deliveriesRef
      .valueChanges()
      .pipe(
        map((deliveryDTOList) => deliveryDTOList.map((deliveryDTO) => this.createDeliveryFromDeliveryDTO(deliveryDTO))),
      )
  }

  findOne(id: string): Observable<Delivery> {
    return this.deliveriesRef
      .doc(id)
      .valueChanges()
      .pipe(map((deliveryDTO: DeliveryDTO) => this.createDeliveryFromDeliveryDTO(deliveryDTO)))
  }

  private createDeliveryFromDeliveryDTO(deliveryDTO: DeliveryDTO): Delivery {
    const delivery: Delivery = { ...deliveryDTO, created: deliveryDTO.created.toDate() }

    return delivery
  }
}

export interface DeliveryDTO {
  created: firebase.firestore.Timestamp
  id: string
  name: string
  startLocation: string
  endLocation: string
  status: string
}
