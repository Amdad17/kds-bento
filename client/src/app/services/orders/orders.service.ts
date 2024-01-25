import { Injectable } from '@angular/core';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  static orders(): OrderItemInterface[] {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  orders : OrderItemInterface[] = [];
  newOrder = new Subject<OrderItemInterface>();
  servedOrder = new Subject<OrderItemInterface>();
  updatedItemsOrder = new Subject<OrderItemInterface>();
  orderStatusChange = new Subject<OrderItemInterface>();

  emitIncomingOrder (order: OrderItemInterface) {
    const index = this.orders.findIndex(item => item._id === order._id);
    if (index === -1) {
      this.orders.push(order);
      this.newOrder.next(order);
    } else {
      this.orders[index] = {...order};
      this.updatedItemsOrder.next(order);
    }
  }

  emitOrderStatusChange (order: OrderItemInterface) {
    this.orderStatusChange.next(order);
    this.orders = this.orders.map(item => item._id === order._id ? order : item);
  }

  emitServedOrder (order: OrderItemInterface) {
    this.servedOrder.next(order);
    this.orders = this.orders.map(item => item._id === order._id ? order : item);
  }
}
