import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders/orders.service';
import { LoadingService } from '../../services/loading/loading.service';
import { RuleService } from '../../services/rule/rule.service';
import { sortOrdersByRules } from '../../utils/sorting.helper';
import { ApiService } from '../../services/api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { ChefService } from '../../services/chef/chef.service';
import { assignChefToPendingOrders } from '../../utils/assign.helper';
import { UtilizationService } from '../../services/utilization/utilization.service';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css'],
})
export class DisplayPageComponent implements OnInit {
  pending: OrderItemInterface[] = [];
  preparing: OrderItemInterface[] = [];
  ready: OrderItemInterface[] = [];
  loadingOrders: OrderItemInterface[] = [];
  served: OrderItemInterface[] = [];

  chefs: IUser[] = [];

  loading: boolean = false;
  dragging: boolean = false;
  restaurantUtilization: number = 0;

  // Constructor
  constructor(
    private orderService: OrdersService,
    private loadingService: LoadingService,
    private ruleService: RuleService,
    private api: ApiService,
    private chefService: ChefService,
    private utilizationService: UtilizationService
    ) {}

  ngOnInit(): void {
  
    this.chefs = this.chefService.chefs;
    this.setOrders(this.orderService.orders);
    this.loading = this.loadingService.orderLoading;
    this.loadingService.orderLoadingEvent.subscribe(value => {
      this.loading = value;
      if (!value) {
        this.chefs = this.chefService.chefs;
        this.setOrders(this.orderService.orders);
        this.calculateRestaurantUtilization();
      }
    });

    this.restaurantUtilization = this.utilizationService.utilization;

    this.chefService.chefChange.subscribe(data => {
      // console.log(data);
      this.chefs = data;
      this.sortAndAssignPendingOrders(this.orderService.orders);
      this.calculateRestaurantUtilization();
      
    });


    this.orderService.newOrder.subscribe(data => {
      this.pending.push(data);
      this.sortAndAssignPendingOrders(this.orderService.orders);
    });

    this.orderService.updatedItemsOrder.subscribe(data => {
      // console.log(data);
      if (data.status === 'preparing') {
        this.preparing = this.preparing.map(item => item._id === data._id ? data : item)
      } else if (data.status === 'ready') {
        this.ready = this.ready.map(item => item._id === data._id ? data : item)
      } else if (data.status === 'pending') {
        this.pending = this.pending.map(item => item._id === data._id ? data : item)
      }
    });

    this.orderService.servedOrder.subscribe(order => this.handleServedOrder(order));
    this.utilizationService.newUtilizationEvent.subscribe(utilization => this.restaurantUtilization = utilization);

    setInterval(() => {
      if (!this.loadingOrders.length && !this.dragging)
        this.sortAndAssignPendingOrders(this.orderService.orders);
    }, 1000 * 60);
  }

  setOrders(orders: OrderItemInterface[]) {
    this.preparing = orders.filter((item) => item.status === 'preparing');
    this.sortAndAssignPendingOrders(orders);
    this.ready = orders.filter((item) => item.status === 'ready');
    this.served = orders.filter((item) => item.status === 'served' || item.status === 'complete');
  }

  sortAndAssignPendingOrders(orders: OrderItemInterface[]) {
    const sortedOrders = sortOrdersByRules(orders.filter((item) => item.status === 'pending'), this.ruleService.rule);
    const preparingOrders = orders.filter((item) => item.status === 'preparing');
    this.pending = assignChefToPendingOrders([...sortedOrders], [...preparingOrders], this.chefs);
    this.calculateRestaurantUtilization();
  }

  calculateRestaurantUtilization(): void {
    const totalChefs = this.chefs.length;
  
    if (totalChefs > 0) {
      const totalChefHours = totalChefs * 1 * 60; 
  
      const totalPreparationTime = this.pending.reduce((totalTime, order) => {
        return totalTime + this.calculateTotalPreparationTime(order);
      }, 0);

      const calculatedUtilization = (totalPreparationTime / totalChefHours) * 100;
      const roundedUtilization = Math.round(calculatedUtilization / 10) * 10;

      if (roundedUtilization !== this.restaurantUtilization) {
        this.api.postRestaurantUtilization(roundedUtilization).subscribe(data => {
          this.utilizationService.setUtilization(roundedUtilization);
          console.log('Restaurant Utilization Data:', data);
        });

        // console.log('Restaurant Utilization: ', restaurantUtilizationData);
      }
     
    } else {
      console.log('No active chefs. Restaurant utilization cannot be calculated.');
    }
  }

  ///////////////////////////

  onDrop(event: CdkDragDrop<OrderItemInterface[]>, targetList: "pending" | "preparing" | "ready") {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const order = event.container.data[event.currentIndex];
      order.status = targetList;

      if(targetList === "pending" || event.previousContainer.id === "cdk-drop-list-0") {
        this.sortAndAssignPendingOrders(this.orderService.orders);
      }

      if(event.previousContainer.id === "cdk-drop-list-0" && order.chef) {
        this.api.addChefToOrder(order._id, order.chef).subscribe(() =>{});
      }

      this.loadingOrders.push(order);
      this.api.updateOrderStatus(order, targetList).subscribe({
        next: () => {
          this.orderService.emitOrderStatusChange(order);
          this.loadingOrders = this.loadingOrders.filter(item => item._id !== order._id);
          if (targetList === "ready") this.checkServedOnTime(order);
        },
        error: (error) => {
          this.loadingOrders = this.loadingOrders.filter(item => item._id !== order._id);
          console.log(error)

          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      });
    }
  }

  onDragStart () { this.dragging = true }
  onDragEnd () { this.dragging = false }

  isOrderLoading (order: OrderItemInterface) {
    return this.loadingOrders.findIndex(item => item._id === order._id) > -1;
  }

  checkServedOnTime(order: OrderItemInterface): void {
    const totalPreparationTime = this.calculateTotalPreparationTime(order);
    let servedOnTime: boolean = false;
    if (order.readyTimestamp && order.preparingTimestamp) {
      const actualPrepTime = ((new Date(order.readyTimestamp).getTime()) - (new Date(order.preparingTimestamp)).getTime()) /  60000;
      servedOnTime = actualPrepTime < totalPreparationTime;
    } else {
      // Handle the case where either readyTimestamp or preparingTimestamp is missing.
      servedOnTime = true;
    }

    const chefData = {
      chefId: order.chef?.employeeInformation.id,
      orderId: order._id,
      servedOnTime: servedOnTime
    }

    this.api.postChefEffiiciency(chefData).subscribe(data => {
      console.log('Chef data to HR is: ', data);
    })
  }

  calculateTotalPreparationTime(order: OrderItemInterface): number {
    return order.items.reduce((totalTime, item) => {
      return totalTime + item.item.itemPreparationTime * item.item.itemQuantity;
    }, 0);
  }

  handleServedOrder (order: OrderItemInterface) {
    this.served.push(order);
    this.ready = this.ready.filter(item => item._id !== order._id);
  }

}
