import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customerModel = new Customer(null, null, null, null, [], []);
  goodLogin:boolean;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Logging in: " + this.customerModel);
    this._authService.login(this.customerModel);
  }
  
  

  checkLoginStatus(){
    return this._authService.LoginStatus;
  }
}
