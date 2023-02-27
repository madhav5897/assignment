import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EmployeeModel } from './employee-model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "https://devrunner.co.in/machine_test/index.php/web_api/Users";

  constructor(private httpClient: HttpClient) { }

  add(EmployeeModel:any) {
    console.log(EmployeeModel.user_gender)
    var formData: any = new FormData();
    formData.append('user_name', EmployeeModel.user_name);
    formData.append('user_email', EmployeeModel.user_email);
    formData.append('user_phone_no', EmployeeModel.user_contact_no);
    formData.append('user_password', EmployeeModel.user_password);



    return this.httpClient.post<EmployeeModel>(this.apiServer + '/Register',formData) .subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (e) => console.error(e)
    });
  }  


  login(loginForm:any){
    console.log(loginForm)
    return this.httpClient.get<EmployeeModel>(this.apiServer + '/login?user_email='+loginForm.user_email+"&user_pwd"+loginForm.user_pw) .subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (e) => console.error(e)
    });

  }



  getAll(){
    return this.httpClient.get<EmployeeModel[]>(this.apiServer + '/')
  }

  updateinservice(EmployeeModel:any){
    return this.httpClient.put<EmployeeModel>(this.apiServer + '/update_user/' , EmployeeModel).subscribe({
      next: (res) => {
      },
      error: (e) => console.error(e)
    });
    
  }

  delete(id:string){

    var formData1: any = new FormData();
    formData1.append('user_id', id);


    return this.httpClient.delete<EmployeeModel>(this.apiServer + '/remove_user' , formData1).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (e) => console.error(e)
    });
    
  }
  
}