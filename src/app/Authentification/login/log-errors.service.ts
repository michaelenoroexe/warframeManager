import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogErrorsService {

  constructor(){ }
  // Handling server errors
  errorHandler(err:any){
    if(err["status"]==400 && err["error"]!="Wrong Login or Password!") {
      return "sLogin or password contain ivalid characters";
    }
    if(err["status"]==400 && err["error"]=="Wrong Login or Password!") {
      return "sWrong login or password";
    }  
    return "sUnknown error";
  }
}
