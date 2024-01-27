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
  served: OrderItemInterface[] = [];
  loadingOrders: OrderItemInterface[] = [];

  chefs: IUser[] = [];

  loading: boolean = false;
  dragging: boolean = false;

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
      this.chefs = data;
      this.sortAndAssignPendingOrders(this.orderService.orders);
    });


    this.orderService.newOrder.subscribe(data => {
      this.pending.push(data);
      this.sortAndAssignPendingOrders(this.orderService.orders);
    });

    this.orderService.updatedItemsOrder.subscribe(data => {
      if (data.status === 'preparing') {
        this.preparing = this.preparing.map(item => item._id === data._id ? data : item)
      } else if (data.status === 'ready') {
        this.ready = this.ready.map(item => item._id === data._id ? data : item)
      } else if (data.status === 'pending') {
        this.pending = this.pending.map(item => item._id === data._id ? data : item)
      }
    });

    this.orderService.servedOrder.subscribe(data => {
      this.handleServedOrder(data);
    })

    setInterval(() => {
      if (!this.loadingOrders.length && !this.dragging)
        this.sortAndAssignPendingOrders(this.orderService.orders);
    }, 1000 * 60);
  }

  setOrders(orders: OrderItemInterface[]) {
    this.preparing = orders.filter((item) => item.status === 'preparing');
    this.sortAndAssignPendingOrders(orders);
    this.ready = orders.filter((item) => item.status === 'ready');
    this.served = orders.filter((item) => item.status === 'served');
  }

  sortAndAssignPendingOrders(orders: OrderItemInterface[]) {
    const sortedOrders = sortOrdersByRules(orders.filter((item) => item.status === 'pending'), this.ruleService.rule);
    const preparingOrders = orders.filter((item) => item.status === 'preparing');
    this.pending = assignChefToPendingOrders([...sortedOrders], [...preparingOrders], this.chefs);
  }

  handleServedOrder (order: OrderItemInterface) {
    this.pending = this.pending.filter(item => item._id !== order._id);
    this.preparing = this.preparing.filter(item => item._id !== order._id);
    this.ready = this.ready.filter(item => item._id !== order._id);
    this.served.push(order);
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
        },
        error: (error) => {
          this.loadingOrders = this.loadingOrders.filter(item => item._id !== order._id);

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

}
