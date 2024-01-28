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

  getRibbonText () {
    if (this.order.type === 'delivery' && this.order.deliveryServiceArriveTime) {

      const current = Date.now();
      const gap = new Date(this.order.deliveryServiceArriveTime).getTime() - current;
      const mins = gap > 0 ? (gap / 60000).toFixed() : 0; 

      return this.order.type.toUpperCase() + ': ' + mins + ' min';
    } else return this.order.type.toUpperCase();
  }

  getOrderTypeColor() {
    switch (this.order.type) { 
      case 'in-house':
          return '#3b5999';
      case 'delivery':
          return '#f50';
      case 'pick-up':
          return '#87d068';     
      default:
          return 'black';
    } 
  }
}
