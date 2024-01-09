import { Component, Input } from '@angular/core';
import { Order } from '../orders/orders.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  @Input() order!: Order;
  @Input() index?: number;

  getListIndex() {
    return this.index ? this.index + 1 : null;
  }

  getDisplayTitle() {
    return this.order.toUpperCase();
  }
}
