import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserProfile(username: string){
    return this._http.get<Customer>("http://localhost:8090/profile/" + username);
  }

  isAdmin(username: string){
    return this._http.get<Boolean>("http://localhost:8090/customer/isAdmin/" + username);
  }

  register(customer: Customer){
    return this._http.post<Customer>("http://localhost:8090/customer/register", customer);
  }

  verifyCredentials(customer: Customer){
    return this._http.post<Boolean>('http://localhost:8090//customer/login', customer);
  }

  usernameAvailable(username: string){
    return this._http.get<Boolean>("http://localhost:8090/customer/available/" + username);
  }
}
