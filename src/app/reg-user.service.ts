import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegUserService {

  constructor(private http: HttpClient){ }

  postData(user: {Login:string, Password:string}){
//      const body = {name: user.login, password: user.password};
      return this.http.post(environment.apiURL+"registration", user); 
  }
}
