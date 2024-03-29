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
    let end = "GetData/ResourcesList";
    let he = {};
    if (tok != null && tok != undefined) {
      end = "GetData/UserResourcesList"
      he = { 
        headers: {
        "Authorization": "Bearer " + tok
        }
      }
    }
    return this.http.get(environment.apiURL+end, he);;
  }
  public GetAllComponents() {
    let tok = localStorage.getItem("accessToken");
    let end = "GetData/ItemsList"
    let he = {}
    if (tok != null && tok != undefined) {
      end = "GetData/UserItemsList"
      he = { 
        headers: {
        "Authorization": "Bearer " + tok
        }
      }
    }
    const re = this.http.get(environment.apiURL+end, he);
    const th = this;
    re.subscribe( {error(err){th.ClearIncorrectUser(err)}})
    return re;
  }
  public GetAllTypes() {
    return this.http.get(environment.apiURL+"GetData/TypesList");
  }
  public GetPlanets() {
    return this.http.get(environment.apiURL+'GetData/Planets'); 
  }
  public GetCredits() {
    let tok = localStorage.getItem("accessToken");
    if (tok == null) return null;
    let end = "GetData/UserCredits"
    let he = {headers: {
      "Authorization": "Bearer " + tok
    }}
    const re = this.http.get(environment.apiURL+end, he);
    const th = this;
    re.subscribe( {error(err){th.ClearIncorrectUser(err)}})
    return re;
  }
  public GetUserInfo() {
    let tok = localStorage.getItem("accessToken");
    if (tok == null) return null;
    let end = "GetData/UserInfo"
    let he = {headers: {
      "Authorization": "Bearer " + tok
    }}
    const re = this.http.get(environment.apiURL+end, he);
    const th = this;
    re.subscribe( {error(err){th.ClearIncorrectUser(err)}})
    return re;
  }

  private ClearIncorrectUser(er:any) {
    if (er.status == 404) {
      if (er.error == "User not found" )
        localStorage.removeItem("accessToken");
    }
  }
}