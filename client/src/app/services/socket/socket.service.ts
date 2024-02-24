import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { IUser } from '../../interfaces/user.interface';

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

  getIncomingOrders() {
    return this.socket.fromEvent<OrderItemInterface>('incoming-order');
  }

  getChefCheckIn () {
    return this.socket.fromEvent<{ chef: IUser}>('chef-check-in');
  }

  getChefCheckOut () {
    return this.socket.fromEvent<{ chef: IUser}>('chef-check-out');
  }
  getServedOrders () {
    return this.socket.fromEvent<{order:  OrderItemInterface}>('order-served');
  }

  getRestaurantUtilization () {
    return this.socket.fromEvent<{utilization: number}>('utilization');
  }
}
