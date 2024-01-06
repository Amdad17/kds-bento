import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-being-preparing',
  templateUrl: './being-preparing.component.html',
  styleUrl: './being-preparing.component.css'
})
export class PendingOrdersComponent {
  orders: Order[]=[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders('being-preparing').subscribe((data) => {
      this.orders = data;
    });
  }

  updateStatus(orderId: number, status: string) {
    this.orderService.updateOrderStatus(orderId, status).subscribe(() => {
      
    });
  }
}