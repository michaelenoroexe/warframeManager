import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable ({
  providedIn: 'root'
})
// Handles error that can happend during expluatation
export class ErrorHandlerService {

  constructor(){ }
  // Checking validation of data in accepted field
  static FieldCheck(form:any, obj: any) {
    if (!obj.invalid) {
      form.dataValid = true;
      form.errorHandler = false;
      return false;
    } 
    if (form.dataValid)
      for (let err in obj.errors) {
        ErrorHandlerService.ErrorDispay(form, err)
        break;
      }
    return true;
  }
  // Display error message 
  static ErrorDispay(form:any, error:string) {
    if (error === 'required') form.errorMessage = 'Required field is missing';
    if (error === 'minlength') form.errorMessage = 'Minimal lenght of fields is 4';
    if (error === 'maxlength') form.errorMessage = 'Maximal lenght of fields is 32';
    if (error === 'noteq') form.errorMessage =     "Control Password doesn't match";    
    if (error[0] == 's') form.errorMessage = error.slice(1,);
    form.dataValid = false;
    form.errorHandler = true;
  }
  // Check equality of password with confirm password
  static NotEualPass(form:any) {
    if (form.form.get("password")?.value !== form.form.get("cPassword")?.value) {
      ErrorHandlerService.ErrorDispay(form, 'noteq');
      return true;
    };
    return false;
    };
}
