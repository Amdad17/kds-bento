import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders/orders.service';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { LoadingService } from '../../services/loading/loading.service';
import { ChefService } from '../../services/chef/chef.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  totalOrders: number = 0;
  pendingOrders: number = 0;
  preparingOrders: number = 0;
  servedOrders: number = 0;
  servedOnTime: number = 0;
  servedOutOfTime: number = 0;

  loading: boolean = false;

  chefs: IUser[] = [];
  chefStats: { chef: IUser, totalServed: number, servedOnTime: number, servedOutOfTime: number }[] = [];

  constructor(
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private chefService: ChefService
  ) {}

  ngOnInit(): void {
    this.setOrders(this.ordersService.orders);
    this.loading = this.loadingService.orderLoading;
    this.loadingService.orderLoadingEvent.subscribe((value) => {
      this.loading = value;
      this.setOrders(this.ordersService.orders);
    });

    this.ordersService.newOrder.subscribe(() => this.pendingOrders++);
  }

  setOrders(orders: OrderItemInterface[]) {
    this.totalOrders = orders.length;
    this.pendingOrders = orders.filter(
      (order) => order.status === 'pending'
    ).length;
    this.preparingOrders = orders.filter(
      (order) => order.status === 'preparing'
    ).length;
    this.servedOrders = orders.filter(
      (order) => order.status === 'complete'
    ).length;
    const targetDeliveryTime = new Date();

    this.servedOnTime = orders.filter((order) => {
      if (!order.preparingTimestamp || !order.readyTimestamp) return false;
      if (order.status !== "complete" && order.status !== "ready") return false;
      const totalPrepTime = order.items.reduce((total, item) => item.itemPreparationTime + total, 0);
      const prepTime = ((new Date(order.readyTimestamp)).getTime() - (new Date(order.preparingTimestamp)).getTime()) / 60000;
      return prepTime < totalPrepTime;
    }).length;

    this.servedOutOfTime = this.servedOrders - this.servedOnTime;
  }
}
