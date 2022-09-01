import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataGetterService {
  constructor(private http:HttpClient) {}
  public GetAllRess() {
    let tok = localStorage.getItem("accessToken");
    let end = ""
    let he = {}
    if (tok != null && tok != undefined) {
      end = "GetData/UserResourcesList"
      he = { 
        headers: {
        "Authorization": "Bearer " + tok
        }
      }
    }
    return this.http.get(environment.apiURL+end, he)
  }
  public GetPlanets() {
    return this.http.get(environment.apiURL+'GetData/Planets')
  }
}