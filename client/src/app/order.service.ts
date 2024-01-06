import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl ='/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(status: string):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiUrl}?status=${status}`);
    
  }
  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}`, { status });
  }
}
