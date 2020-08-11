import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DeliveryService } from './core/services/delivery/delivery.service'
import { DeliveryServiceImpl } from './core/services/delivery/delivery.service-impl'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AngularFireModule.initializeApp(environment.firebase), HttpClientModule],
  providers: [{ provide: DeliveryService, useClass: DeliveryServiceImpl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
