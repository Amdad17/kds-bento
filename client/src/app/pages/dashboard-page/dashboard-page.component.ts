import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders/orders.service';

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

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    const orders = this.ordersService.orders;

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
  
