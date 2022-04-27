import { BoundElementProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  valid:any =[Validators.required, Validators.minLength(4), Validators.maxLength(32),]
  login: FormControl = new FormControl('', this.valid);
  password: FormControl = new FormControl('', this.valid);
  cPassword: FormControl = new FormControl('', this.valid);
  formvisible: boolean =  !true;
  loginInvalid: boolean = false;
  passwordInvalid: boolean = false;
  cPasswordInvalid: boolean = false;
  dataValid: boolean = false;
  errorHandler: boolean = false;
  errorMessage: string = '';
  errorUser:RegErrorsService = new RegErrorsService();

  constructor(private regUser: RegUserService, errorUser:RegErrorsService) {}

  ngOnInit(): void {}

  userRegisterClick() {
    this.dataValid = true;
    this.errorHandler = false;
    this.loginInvalid = ErrorHandlerService.FieldCheck(this, this.login);
    this.passwordInvalid = ErrorHandlerService.FieldCheck(this, this.password);
    this.cPasswordInvalid = ErrorHandlerService.FieldCheck(this, this.cPassword);
    if (this.password.value !== this.cPassword.value) {
      this.dataValid = false;
      ErrorHandlerService.ErrorDispay(this, 'noteq');
    }
    if (this.dataValid) {
      const user = {
        Login: this.login.value,
        Password: this.password.value,
      };
      const acc = this;
      const che = this.regUser.PostData(user);
      che.subscribe({
        error(err) {
          ErrorHandlerService.ErrorDispay(acc, acc.errorUser.errorHandler(err));
        },
        complete() {
          acc.formvisible = true;
        },
      });
    }
  }
}
