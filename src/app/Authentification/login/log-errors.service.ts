import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogErrorsService {

  constructor(){ }
  // Handling server errors
  errorHandler(err:any){
    if(err["status"]==400 && err["error"]=="User with this login is not created") {
      return "sUser with this login is not created";
    }
    if(err["status"]==400 && err["error"]=="Password don't match.") {
      return "sWrong login or password";
    } 
    if(err["status"]==400 && err["error"]!="Password don't match.") {
      return "sLogin or password contain ivalid characters";
    } 
    return "sUnknown error";
  }
}
