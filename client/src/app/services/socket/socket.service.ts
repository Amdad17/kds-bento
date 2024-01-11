import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { OrderItemInterface } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  getNewOrder() {
    return this.socket.fromEvent<OrderItemInterface>('new-order');
  }
}
