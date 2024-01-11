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

  emitNewOrder (order: OrderItemInterface) {
    this.newOrder.next(order);
    this.orders.push(order);
  }
}
