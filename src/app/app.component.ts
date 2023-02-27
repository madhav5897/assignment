import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from './crud.service';
import { EmployeeModel } from './employee-model';
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
   isLoggedIn:boolean=true

  editemployee: boolean = false;
  noteditemployee: boolean = true;

  user_name: string;
  user_email: string;
  user_contact_no: string;
  user_password: string;
  user_gender: string;
  gender:string;


  employeeModelObj: EmployeeModel;

  employeeForm = new FormGroup({
    user_name: new FormControl(),
    user_email: new FormControl(),
    user_contact_no: new FormControl(),
    user_password: new FormControl(),
    user_gender: new FormControl(),
  });

  employeeData: any = [];
  idselected: any;

  constructor(public crudService: CrudService) {

    setTimeout (() => {
      this.setlogin();
   }, 100);


    this.getAll();
  }

  ngOnInIt() {
  }

  setlogin(){
    this.isLoggedIn=LoginComponent.isLoggedInGlobal
  }

  setmale(){
this.gender="male"
  }
  setfemale(){
    this.gender="female"
  }


  submitForm() {
    this.employeeForm.value.user_gender=this.gender

    this.crudService.add(this.employeeForm.value)
     this.getAll();
    this.employeeForm.reset()

  }


  getAll() {
    this.crudService.getAll().subscribe(
      response => {
        
this.employeeData=response;
console.log(this.employeeData.data)

      },
      error => {
        console.log(error);
      });
  }

  cancel() {
    this.user_name = "";
    this.user_email = "";
    this.user_contact_no = "";
    this.user_password = '';
    this.user_gender = "";

  }

  edit(employee: any) {
    this.editemployee = true;
    this.noteditemployee = false;

    this.user_name = employee.user_name;
    this.user_email = employee.user_email;
    this.user_contact_no = employee.user_phone_no;
    this.user_gender = employee.user_gender;
    this.user_password = employee.user_pwd;
  }

  update() {
    this.crudService.updateinservice( this.employeeForm.value)
    this.getAll();
    this.editemployee = false;
    this.noteditemployee = true;
  }

  delete(employee: any) {

    this.crudService.delete(employee.user_id);
    this.getAll()
  }

}
