import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders/orders.service';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { IUser } from '../../interfaces/user.interface';

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
chefs: any;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    const orders = this.ordersService.orders;
    const chefs = this.getChefsFromOrders(orders);
    console.log(chefs);

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


  getChefsFromOrders (orders: OrderItemInterface[]) {
    const chefs : {
      chef: IUser,
      totalServed: number,
      servedOnTime: number,
      servedLate: number
    }[] = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order.chef) {
        const index = chefs.findIndex(item => order.chef && item.chef.employeeInformation.id === order.chef.employeeInformation.id);
        if (index === -1) {
          const chef = order.chef!;
          const totalServedOrders = orders.filter(order => ((order.status === "ready" || order.status === "complete") && order.chef && order.chef.employeeInformation.id === chef.employeeInformation.id));
          console.log(orders)

          const totalServed = totalServedOrders.length;
          const servedOnTime = totalServedOrders.filter(order => {
            if (!order.preparingTimestamp || !order.readyTimestamp) return true;
            const serviceTime = ((new Date(order.readyTimestamp).getTime()) - (new Date(order.preparingTimestamp)).getTime()) /  60000;
            const totalPrepTime = order.items.reduce((total, item) => total + item.itemPreparationTime, 0);

            return serviceTime < totalPrepTime;
          }).length;

          const servedLate = totalServed - servedOnTime;

          chefs.push({ chef, totalServed, servedLate, servedOnTime })
        }
      }      
    }

    return chefs;
  }
}

  
