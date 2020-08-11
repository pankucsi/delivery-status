import { Component } from '@angular/core'
import { DeliverDetailsFacade } from '../deliver-details-facade'
@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss'],
  providers: [DeliverDetailsFacade],
})
export class DeliveryDetailsComponent {
  delivery$ = this.deliverDetailsFacade.delivery$
  courierPosition$ = this.deliverDetailsFacade.courierPosition$
  locations$ = this.deliverDetailsFacade.locations$
  directions$ = this.deliverDetailsFacade.directions$
  places$ = this.deliverDetailsFacade.places$
  selectedAddress$ = this.deliverDetailsFacade.selectedAddress$
  vehicle$ = this.deliverDetailsFacade.vehicle$
  vehicleIcon$ = this.deliverDetailsFacade.vehicleIcon$

  statuses = [
    { id: 'Ordered', index: 0, title: 'package sent from store' },
    { id: 'Warehouse', index: 1, title: 'package at warehouse' },
    { id: 'Arrived', index: 2, title: 'package arrived to destination' },
  ]

  currentPlace = this.deliverDetailsFacade.currentPlace

  constructor(private deliverDetailsFacade: DeliverDetailsFacade) {}

  handleEndLocationChange(id, endLocation) {
    this.deliverDetailsFacade.updateEndLocation(id, { endLocation })
    this.deliverDetailsFacade.currentPlace.setValue(endLocation)
  }

  handleEndLocationInputChange(inputValue: string) {
    this.deliverDetailsFacade.currentPlace.setValue(inputValue)
  }

  handleVehicleChange(vehicle) {
    this.deliverDetailsFacade.updateVehicle(vehicle)
  }

  handleVehicleInputChange(vehicle) {
    this.deliverDetailsFacade.updateVehicle(vehicle)
  }

  isActive(status, deliveryStatusId) {
    const deliveryStatus = this.statuses.find((st) => st.id === deliveryStatusId)
    return status.index <= deliveryStatus.index
  }
}
