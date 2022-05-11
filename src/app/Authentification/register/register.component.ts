import { BoundElementProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegUserService } from './reg-user.service';
import { RegErrorsService } from './reg-errors.service';
import { ErrorHandlerService } from '../Shared/error-handler.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegUserService, RegErrorsService],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formvisible: boolean =  !true;
  loginInvalid: boolean = false;
  passwordInvalid: boolean = false;
  cPasswordInvalid: boolean = false;
  dataValid: boolean = false;
  errorHandler: boolean = false;
  errorMessage: string = '';
  errorUser:RegErrorsService = new RegErrorsService();

  constructor(private regUser: RegUserService, errorUser:RegErrorsService) {}

  // Initialisation register component
  ngOnInit(): void {
    const valid =[Validators.required, Validators.minLength(4), Validators.maxLength(32),]
    this.form = new FormGroup ({
      login: new FormControl(null, valid),
      password: new FormControl(null, valid),
      cPassword: new FormControl(null, valid),
    })
  }

  // Checking validation of data
  logValCh(){ this.loginInvalid = ErrorHandlerService.FieldCheck(this, this.form.get("login")) }
  passValCh(){ this.passwordInvalid = ErrorHandlerService.FieldCheck(this, this.form.get("password")) }
  cPassValCh(){ this.cPasswordInvalid = ErrorHandlerService.FieldCheck(this, this.form.get("cPassword")) }  

  // Register form submit handler
  userRegisterClick() {
    this.form.disable();
    const acc = this;
    ErrorHandlerService.NotEualPass(acc);
    if (acc.dataValid) {
      const user = {
        Login: acc.form.value.login,
        Password: acc.form.value.password,
      };
      const che = acc.regUser.PostData(user);
      che.subscribe({
        error(err) {
          ErrorHandlerService.ErrorDispay(acc, acc.errorUser.errorHandler(err));
        },
        complete() {
          acc.formvisible = true;
        },
      });
    }
    acc.form.enable();
  }
}
