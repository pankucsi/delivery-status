import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'deliveries',
    loadChildren: () => import('./delivery/delivery.module').then((m) => m.DeliveryModule),
  },
  { path: '**', redirectTo: '/deliveries', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
