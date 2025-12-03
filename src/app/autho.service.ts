import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthoService {

  constructor(private _HttpClient:HttpClient) { }

  apiUrl:any='https://ksatest.ksa-students.com/api/'

  login = new BehaviorSubject(false)

  
  Login(form: any): Observable<any> {                                      
    return this._HttpClient.post(this.apiUrl+'signin',form);
  }


    
  check(){
    let Access= localStorage.getItem("access_token");
   

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Access}`
    });    
    return this._HttpClient.post(this.apiUrl+'checkAuthAvaliable' ,headers , {headers} );
    
  }

  
}




