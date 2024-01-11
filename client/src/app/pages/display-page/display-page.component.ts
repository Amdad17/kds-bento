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

  loading: boolean = false;

  constructor(
    private orderService: OrdersService,
    private loadingService: LoadingService,
    private ruleService: RuleService,
    private api: ApiService
    ) {}

  ngOnInit(): void {
    this.setOrders(this.orderService.orders);
    this.loading = this.loadingService.orderLoading;
    this.loadingService.orderLoadingEvent.subscribe(value => {
      this.loading = value;
      if (!value) this.setOrders(this.orderService.orders);
    })

    this.orderService.newOrder.subscribe(data => {
      this.pending = sortOrdersByRules([...this.pending, data], this.ruleService.rule);
    });

    setInterval(() => {
      this.pending = sortOrdersByRules(this.pending, this.ruleService.rule);
    }, 1000 * 60);
  }

  setOrders(orders: OrderItemInterface[]) {
    this.pending = sortOrdersByRules(orders.filter((item) => item.status === 'pending'), this.ruleService.rule);
    this.preparing = orders.filter((item) => item.status === 'preparing');
    this.ready = orders.filter((item) => item.status === 'ready');
    this.served = orders.filter((item) => item.status === 'complete');
  }

  onDrop(event: CdkDragDrop<OrderItemInterface[]>, targetList: "pending" | "preparing" | "ready" | "complete") {
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

      event.container.data[event.currentIndex].status = targetList

      this.api.updateOrderStatus(event.container.data[event.currentIndex], targetList).subscribe((order) => {
        this.orderService.emitOrderStatusChange(order);
      });
    }
  }
}
