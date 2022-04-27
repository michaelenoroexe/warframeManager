import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(private http: HttpClient){ }

  postData(user: {Login:string, Password:string}){
//      const body = {name: user.login, password: user.password};
      return this.http.post('https://localhost:7132/api/signin', user); 
  }
}
