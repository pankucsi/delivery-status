import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component'

const routes: Routes = [
  {
    path: '',
    component: DeliveryDetailsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryDetailsRoutingModule {}
