import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceInfoChangeService {

  constructor (private http: HttpClient){ }
  public ResourceNumberChange(change: {Resource:string, Number:number}) {
    let tok = localStorage.getItem("accessToken");
    return this.http.post(environment.apiURL+"ProfUp", change, {
      headers: {
        "Authorization": "Bearer " + tok
      }
    }) 
  }
}