import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders/orders.service';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  totalOrders: number = 0;
  pendingOrders: number = 0;
  preparingOrders: number = 0;
  servedOrders: number = 0;
  servedOnTime: number = 0;
  servedOutOfTime: number = 0;

  constructor(
    private ordersService: OrdersService, 
    private loadingService: LoadingService,
    ) {}

  ngOnInit(): void {
    this.setOrders(this.ordersService.orders);
    this.loadingService.orderLoadingEvent.subscribe(() => 
      this.setOrders(this.ordersService.orders)
    );

    this.ordersService.newOrder.subscribe(() => this.pendingOrders++);
  }


  setOrders (orders: OrderItemInterface[]) {
    this.totalOrders = orders.length;
    this.pendingOrders = orders.filter((order) => order.status === 'pending').length;
    this.preparingOrders = orders.filter((order) => order.status === 'preparing').length;
    this.servedOrders = orders.filter((order) => order.status === 'complete').length;
    const targetDeliveryTime = new Date(); 

    this.servedOnTime = orders.filter((order) => {
      const deliveryTime = new Date(order.deliveryTimestamp); 
      return deliveryTime <= targetDeliveryTime;
    }).length;

    this.servedOutOfTime = this.servedOrders - this.servedOnTime;
  }
}
  
