import { Component, Input } from '@angular/core'
import { Delivery } from '../../../core/services/delivery/delivery.service'

@Component({
  selector: 'app-delivery-card',
  template: `
    <div class="col-6 col-lg-4 order-lg-1">
      <div class="row">
        <div class="col-12 col-lg-6 font-weight-bold">
          {{ delivery.id }}
        </div>
        <div class="col-12 col-lg-6 font-weight-light text-secondary">
          {{ delivery.created | date: 'MM/dd/yyyy' }}
        </div>
      </div>
    </div>
    <div class="col-6 col-lg-2 d-flex justify-content-end align-self-center order-lg-4">
      <span class="p-1 border rounded ">{{ delivery.status }}</span>
    </div>
    <div class="col-12 col-lg-2 order-lg-3">
      {{ delivery.name }}
    </div>
    <div class="col-12 col-lg-4 order-lg-2 text-secondary">
      {{ delivery.endLocation }}
    </div>
  `,
  styleUrls: ['./delivery-card.component.scss'],
})
export class DeliveryCardComponent {
  @Input() delivery: Delivery

  constructor() {}
}
