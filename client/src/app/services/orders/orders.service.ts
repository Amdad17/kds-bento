import { Injectable } from '@angular/core';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  orders : OrderItemInterface[] = [];
  newOrder = new Subject<OrderItemInterface>();
  orderStatusChange = new Subject<OrderItemInterface>();

  emitNewOrder (order: OrderItemInterface) {
    this.newOrder.next(order);
    this.orders.push(order);
  }

  emitOrderStatusChange (order: OrderItemInterface) {
    this.orderStatusChange.next(order);
    this.orders = this.orders.map(item => item._id === order._id ? order : item);
  }
}
