import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { IRules } from '../../interfaces/rules.interface';
import { OrderItemInterface } from '../../interfaces/order.interface';
import { IEmployeeInfo } from '../../interfaces/employeeInfo.interface';

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

  getOrders () : Observable<{ data: OrderItemInterface[] }> {
    return this.http.get<{ data: OrderItemInterface[] }>(environment.API_URL + '/orders/restaurant');
  }

  updateOrderStatus (order: OrderItemInterface, status: "pending" | "preparing" | "ready" | "complete") : Observable<OrderItemInterface> {
    return this.http.put<OrderItemInterface>(environment.API_URL + "/orders/status", { orderId: order._id, status , type: order.type});
  }

  addChefToOrder (orderId: string, chef: IUser) {
    return this.http.put<OrderItemInterface>(environment.API_URL + "/orders/chef/" + orderId , { chef });
  }

  getActiveChefs () : Observable<{ data: { employee: IEmployeeInfo }[]}> {
    return this.http.get<{ data: { employee: IEmployeeInfo }[]}>(environment.API_URL + '/chef/active');
  }

  getOrdersByHourly (): Observable<{ data:{ count: number, hour: number }[] }>{
    return this.http.get<{ data:{ count: number, hour: number }[] }>(environment.API_URL + '/orders-hourly/ordersHourly');
  }

  getOrdersByWeekly (): Observable<{ data:{ count: number, day: number }[] }>{
    return this.http.get<{ data:{ count: number, day: number }[] }>(environment.API_URL + '/orders-weekly/ordersWeekly');
  }

  getOrdersByMonthly (): Observable<{ data:{ count: number, month: number }[] }>{
    return this.http.get<{ data:{ count: number, month: number }[] }>(environment.API_URL + '/orders-monthly/ordersMonthly');
  }

  postChefEffiiciency(chefData: any):Observable<any>{
    return this.http.post<any>(environment.API_URL +'/chef/efficiency', chefData);
  }

  postRestaurantUtilization(utilization: number):Observable<any>{
    return this.http.post<any>(environment.API_URL +'/utilization/restaurant-Utilization', { utilization });
  }

  getRestaurantUtilization() {
    return this.http.get<{ utilization: number, updatedAt: Date }>(environment.API_URL + '/utilization/restaurant-utilization');
  }
}
