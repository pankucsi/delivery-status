import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DeliveryCardComponent } from './delivery-card/delivery-card.component'
import { DeliveryListRoutingModule } from './delivery-list-routing.module'
import { DeliveryListComponent } from './delivery-list/delivery-list.component'

@NgModule({
  declarations: [DeliveryListComponent, DeliveryCardComponent],
  imports: [CommonModule, DeliveryListRoutingModule],
})
export class DeliveryListModule {}
