import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable, observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { checkAndUpdateElementInline } from '@angular/core/src/view/element';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private _currentUser = JSON.parse(localStorage.getItem('currentUser'));
  private _isAdmin = JSON.parse(localStorage.getItem("isAdmin") || 'false');
  constructor(private _http: HttpClient, private _userService: UserService, private _router: Router) { }

  get LoginStatus(){
    return this._loginStatus;
  }

  set LoginStatus(value: boolean){
    this._loginStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }

  get AdminStatus(){
    return this._isAdmin;
  }

  private set CurrentUser(user: Customer){
    this._currentUser = 
      this._userService.getUserProfile(user.username).subscribe(
        data => 
        {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this._currentUser = data;
        }
      )
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  //user only contains password and username
  login(user: Customer){
    this._userService.verifyCredentials(user).subscribe(
      value => 
      {
        if(value)
        {
          this.CurrentUser = user;
          this.LoginStatus = true;
          this.checkAdminStatus(user.username);
          console.log("Good");
          this._router.navigateByUrl('#');
        }
        else
        {
          console.log("Bad");
          this._router.navigateByUrl('/loginfail');
        }
      }
    )
  }
  checkAdminStatus(username: string) {
    this._userService.isAdmin(username).subscribe(
      value => {
        localStorage.setItem('isAdmin', value.toString());
        this._isAdmin = value;
      }
    )
  }

  logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin");
    this.LoginStatus = false;
    this._isAdmin = false;
  }
}
