import { Component, Input } from '@angular/core';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { stringToHexColor } from '../../utils/color.helper';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  @Input() order!: OrderItemInterface;
  @Input() index?: number;
  @Input() loading!: boolean;

  
  getListIndex() {
    return this.index ? this.index + 1 : null;
  }
  
  getDisplayTitle() {
    return this.order._id;
  }

  getChefColor () {
    return this.order.chef ? stringToHexColor(this.order.chef.employeeInformation.name) : '#FFFFFF';
  }
}
