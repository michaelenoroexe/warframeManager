import { Injectable } from '@angular/core';
import { UserInfoStorage, UserInfoStorageService } from '../navbar/userinfo/user-info-storage.service';
import { Resource } from './items.service';
import { ResourceInfoChangeService } from './resource-info-changing-request.service';

@Injectable({
  providedIn: 'root'
})
export class NumFieldChangeService {

  user:UserInfoStorage  = new UserInfoStorage();
  constructor(private save: ResourceInfoChangeService, private userInfo:UserInfoStorageService) { 
    userInfo.GetUserInf().then(val => this.user = val);
  }
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
    if (this.user.anonymous) {
      event.target.value = 0;
      res.owned = 0;
      return;
    }
    this.save.ResourceNumberChange({Resource: res.id, Number: res.owned, Type: type}).subscribe({
      next(value) {
      },
      error(err) {
        alert(err.message)
      }
    })
  }
  //Changed Resource number save
  saveNewCredNum(event:any)
  {
    this.setZero(event);
    if (this.user.anonymous) {
      event.target.value = 0;
      return;
    }
    this.save.CreditsNumChange({Number:event.target.value}).subscribe({
      next(value) {
      },
      error(err) {
        alert(err.message)
      }
    })
  }
  // Set zero if field is null
  setZero(event:any, num:Resource | null = null)
  {
    if (event.target.value == "" 
    || event.target.value == null 
    || event.target.value == undefined) {
      event.target.value = 0;
      if (num != null)
        num.owned = 0;
      return 0;
    }
    try {
      if (event.target.value.length > 1 ) {
        event.target.value = (parseInt(event.target.value)).toString();
        if (event.target.value == 'NaN') event.target.value = '0';
        if (num != null)
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
