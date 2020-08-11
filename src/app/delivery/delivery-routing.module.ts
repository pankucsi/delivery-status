import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./delivery-list/delivery-list.module').then((m) => m.DeliveryListModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./delivery-details/delivery-details.module').then((m) => m.DeliveryDetailsModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule {}
