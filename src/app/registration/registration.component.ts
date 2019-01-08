import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Customer } from '../models/customer';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  customerRole = new Role(3, 'ROLE_CUSTOMER');
  rolesModel = [this.customerRole];
  customerModel = new Customer(null, null, null, null, this.rolesModel, []);
  
  firstTryUsername = true;

  constructor(private _userService: UserService, private _authService: AuthService) { }

  ngOnInit() {
  } 

  onSubmit() {
    this._userService.usernameAvailable(this.customerModel.username)
      .subscribe(
        value => 
        {
          if (value)
          {
            this._userService.register(this.customerModel)
              .subscribe(
                data => {
                  console.log('Success!');          
                  this._authService.login(this.customerModel);
                },
                error => console.error("Error!", error)
              );
          }
          else
          {
            console.log("Username not available");
            this.firstTryUsername = false;
          }
        }
      )
    
  }
}
