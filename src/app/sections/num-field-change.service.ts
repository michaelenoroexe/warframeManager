import { Injectable } from '@angular/core';
import { ResourceInfoChangeService } from './resource-info-changing-request.service';

@Injectable({
  providedIn: 'root'
})
export class NumFieldChangeService {

  constructor(private save: ResourceInfoChangeService) { }
   // Only Integer Numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  //Changed Resource number save
  saveNewResNum(id:any, num:number, type:string)
  {
    this.save.ResourceNumberChange({Resource: id, Number: num, Type: type}).subscribe({
      next(value) {
      },
      error(err) {
        alert(err)
      }
    })
  }
  // Set zero if field is null
  setZero(event:any)
  {
    if (event.target.value == "" 
    || event.target.value == null 
    || event.target.value == undefined) {
      event.target.value = 0;
      return true;
    }
    try {
      if (event.target.value.length > 1 ) {
        event.target.value = (+event.target.value).toString();
        return true;
      }
      return false;
    }
    catch (err) {
      return false;
    }
  }
}
