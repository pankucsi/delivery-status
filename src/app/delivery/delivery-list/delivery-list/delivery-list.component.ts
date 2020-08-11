import { Component, OnInit } from '@angular/core'
import { DeliveryService } from '../../../core/services/delivery/delivery.service'

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {
  deliveries$ = this.deliveryService.findAll()

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {}
}
