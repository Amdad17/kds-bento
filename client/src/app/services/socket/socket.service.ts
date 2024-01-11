import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { OrderItemInterface } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  connect () {
    return this.socket.connect();
  }

  joinRestaurantRoom (restaurantId: number) {
    this.socket.emit('join', { restaurantId });
    return true;
  }

  getNewOrder() {
    return this.socket.fromEvent<OrderItemInterface>('new-order');
  }
}
