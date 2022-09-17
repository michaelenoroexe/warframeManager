import { Injectable } from '@angular/core';
import { Resource } from './items.service';
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
  saveNewResNum(event:any, res:Resource, type:string)
  {
    this.setZero(event, res);
    this.save.ResourceNumberChange({Resource: res.id, Number: res.owned, Type: type}).subscribe({
      next(value) {
      },
      error(err) {
        alert(err.message)
      }
    })
  }
  // Set zero if field is null
  setZero(event:any, num:Resource = new Resource())
  {
    if (event.target.value == "" 
    || event.target.value == null 
    || event.target.value == undefined) {
      event.target.value = 0;
      num.owned = 0;
      return 0;
    }
    try {
      if (event.target.value.length > 1 ) {
        event.target.value = (parseInt(event.target.value)).toString();
        num.owned = event.target.value;
        return +event.target.value;
      }
      return 0;
    }
    catch (err) {
      return 0;
    }
  }
}
