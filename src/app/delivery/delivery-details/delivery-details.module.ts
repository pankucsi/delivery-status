import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { environment } from 'src/environments/environment'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { DeliveryDetailsRoutingModule } from './delivery-details-routing.module'
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component'
import { DeliveryMapComponent } from './delivery-map/delivery-map.component'
import { DirectionsService } from './services/directions/directions.service'
import { DirectionsServiceImpl } from './services/directions/directions.service-impl'
import { DirectionsServiceMock } from './services/directions/directions.service-mock'
import { PlacesService } from './services/places/places.service'
import { PlacesServiceImpl } from './services/places/places.service-impl'
import { PlacesServiceMock } from './services/places/places.service-mock'
@NgModule({
  declarations: [DeliveryDetailsComponent, DeliveryMapComponent, AutocompleteComponent],
  imports: [CommonModule, DeliveryDetailsRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: DirectionsService, useClass: environment.mock ? DirectionsServiceMock : DirectionsServiceImpl },
    { provide: PlacesService, useClass: environment.mock ? PlacesServiceMock : PlacesServiceImpl },
  ],
})
export class DeliveryDetailsModule {}
