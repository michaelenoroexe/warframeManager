import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable ({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(){ }

  static FieldCheck(form:any, obj: FormControl) {
    if (!obj.invalid) return false; 
    if (form.dataValid)
      for (let err in obj.errors) {
        ErrorHandlerService.ErrorDispay(form, err)
        break;
      }
    return true;
  }

  static ErrorDispay(form:any, error:string) {
    if (error === 'required') form.errorMessage = 'Required field is missing';
    if (error === 'minlength') form.errorMessage = 'Minimal lenght of fields is 4';
    if (error === 'maxlength') form.errorMessage = 'Maximal lenght of fields is 15';
    if (error[0] == 's') form.errorMessage = error.slice(1,);
    form.dataValid = false;
    form.errorHandler = true;
  }
}