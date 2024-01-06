import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Order[]=[]

  constructor(private orderService: OrderService) {}
  

  ngOnInit() {
    this.orderService.getOrders('pending').subscribe((data) => {
      this.orders = data;
    });
  }

  updateStatus(orderId: number, status: string) {
    this.orderService.updateOrderStatus(orderId, status).subscribe(() => {
  
    });
  }
}

