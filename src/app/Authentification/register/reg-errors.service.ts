import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegErrorsService {

  constructor(){ }

  errorHandler(err:any){
    if(err["status"]==400) {
      return "sLogin or password contain ivalid characters";
    } 
    if(err["status"]==409) {
      return "sLogin already exist";
    } 
    return "s"+err["error"];
  }
}