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
  served:any;

  chefs: IUser[] = [];

  loading: boolean = false;
  dragging: boolean = false;

  // Constructor
  constructor(
    private orderService: OrdersService,
    private loadingService: LoadingService,
    private ruleService: RuleService,
    private api: ApiService,
    private chefService: ChefService
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
      }
    })

    this.chefService.chefChange.subscribe(data => {
      console.log(data);
      this.chefs = data;
      this.sortAndAssignPendingOrders(this.orderService.orders);
    });


    this.orderService.newOrder.subscribe(data => {
      this.pending.push(data);
      this.sortAndAssignPendingOrders(this.orderService.orders);
    });

    this.orderService.updatedItemsOrder.subscribe(data => {
      console.log(data);
      if (data.status === 'preparing') {
        this.preparing = this.preparing.map(item => item._id === data._id ? data : item)
      } else if (data.status === 'ready') {
        this.ready = this.ready.map(item => item._id === data._id ? data : item)
      } else if (data.status === 'pending') {
        this.pending = this.pending.map(item => item._id === data._id ? data : item)
      }
    });

    setInterval(() => {
      if (!this.loadingOrders.length && !this.dragging)
        this.sortAndAssignPendingOrders(this.orderService.orders);
    }, 1000 * 60);
  }

  setOrders(orders: OrderItemInterface[]) {
    this.preparing = orders.filter((item) => item.status === 'preparing');
    this.sortAndAssignPendingOrders(orders);
    this.ready = orders.filter((item) => item.status === 'ready');
    
  }

  sortAndAssignPendingOrders(orders: OrderItemInterface[]) {
    const sortedOrders = sortOrdersByRules(orders.filter((item) => item.status === 'pending'), this.ruleService.rule);
    const preparingOrders = orders.filter((item) => item.status === 'preparing');
    this.pending = assignChefToPendingOrders([...sortedOrders], [...preparingOrders], this.chefs);
  }

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
      console.log(order)
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

}
