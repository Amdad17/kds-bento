import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { IRules } from '../../interfaces/rules.interface';
import { OrderItemInterface } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authenticate (code: string) {
    return this.http.get(environment.API_URL + '/auth/token/' + code);
  }

  getUser () : Observable<{ user: IUser }> {
    return this.http.get<{ user: IUser }>(environment.API_URL + '/auth/user');
  }

  getRules () : Observable<(IRules & { restaurantId: string }) | null> {
    return this.http.get<(IRules & { restaurantId: string }) | null>(environment.API_URL + '/rules/get');
  }

  setRules (rules: IRules) : Observable<{rules: (IRules & { restaurantId: string })}> {
    return this.http.post<{ rules: (IRules & { restaurantId: string })}>(environment.API_URL + '/rules/add', rules);
  }

  getOrders () : Observable<OrderItemInterface[]> {
    return this.http.get<OrderItemInterface[]>(environment.API_URL + '/orders/restaurant');
  }

  updateOrderStatus (order: OrderItemInterface, status: "pending" | "preparing" | "ready" | "complete") : Observable<OrderItemInterface> {
    return this.http.put<OrderItemInterface>(environment.API_URL + "/orders/status", { orderId: order._id, status });
  }

  addChefToOrder (orderId: string, chef: IUser) {
    return this.http.put<OrderItemInterface>(environment.API_URL + "/orders/chef/" + orderId , { chef });
  }
}
