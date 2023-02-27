import { Component } from '@angular/core';
import { EmployeeModel } from '../employee-model';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl } from '@angular/forms';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  static isLoggedInGlobal:boolean=true;

loginForm = new FormGroup({
  user_email: new FormControl(),
  user_pwd: new FormControl(),
});



constructor(private crudservice:CrudService) { }


login(){

this.crudservice.login(this.loginForm.value)

}



}
