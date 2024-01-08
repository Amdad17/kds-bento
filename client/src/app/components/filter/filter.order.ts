// filter-orders.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../orders/orders.component';

@Pipe({
  name: 'filterOrders'
})
export class FilterOrdersPipe implements PipeTransform {
  transform(orders: Order[], status: string): Order[] {
    return orders.filter(order => order.status === status);
  }
}
