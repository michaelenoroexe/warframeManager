import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfoChangeService {

  constructor (private http: HttpClient){ }
  public ProfileInfoChange(change: {Image:number, Rank:number}) {
    let tok = localStorage.getItem("accessToken");
    return this.http.post(environment.apiURL+"ProfUp/userInfo", change, {
      headers: {
        "Authorization": "Bearer " + tok
      }
    }) 
  }

  public UserPasswordChange(change: {OldPassword:string, NewPassword:string}) {
    let tok = localStorage.getItem("accessToken");
    return this.http.post(environment.apiURL+"passChange", change, {
      headers: {
        "Authorization": "Bearer " + tok
      }
    }) 
  }

  public UserDelete(change: {Password:string}) {
    let tok = localStorage.getItem("accessToken");
    return this.http.post(environment.apiURL+"delUser", change, {
      headers: {
        "Authorization": "Bearer " + tok
      }
    }) 
  }
}
