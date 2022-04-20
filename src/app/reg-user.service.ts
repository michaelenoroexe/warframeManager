import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegUserService {

  constructor(private http: HttpClient){ }

  postData(user: {login:string, password:string}){
      const body = {name: user.login, password: user.password};
//      return this.http.post('http://localhost:3000/postuser', body); 
  }
}
