import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  createOrder(order: Order, username: string){
    this._http.post<Order>('localhost:8090/order/create-order/' + username, order);
  }

  getOrderById(id: number){
    this._http.get('localhost:8090/order/' + id);
  }

  getAllOrdersByCustomerId(id: number){
    this._http.get('localhost:8090/order/customer-by-id/' + id);
  }

  getAllOrdersByUsername(username: string){
    this._http.get('localhost:8090/order/customer-by-username/' + username);
  }
}
