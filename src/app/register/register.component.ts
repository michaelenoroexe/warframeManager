import { BoundElementProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegUserService } from '../reg-user.service';
import { RegErrorsService } from './reg-errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegUserService, RegErrorsService],
})
export class RegisterComponent implements OnInit {
  login: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(32),
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(32),
  ]);
  cPassword: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(32),
  ]);
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
  errorDispayer(err: string) {
    if (err === 'required') this.errorMessage = 'Required field is missing';
    if (err === 'minlength') this.errorMessage = 'Minimal lenght of fields is 4';
    if (err === 'maxlength') this.errorMessage = 'Maximal lenght of fields is 15';
    if (err === 'noteq') this.errorMessage = 'Control password is incorrect';
    if (err[0] == 's') this.errorMessage = err.slice(1,);
    this.errorHandler = true;
  }

  fieldCheck(obj: FormControl) {
    if (obj.invalid) {
      if (this.dataValid)
        for (let err in obj.errors) {
          this.errorDispayer(err);
          this.dataValid = false;
          break;
        }
      return true;
    }
    return false;
  }

  userRegisterClick() {
    this.dataValid = true;
    this.errorHandler = false;
    this.loginInvalid = this.fieldCheck(this.login);
    this.passwordInvalid = this.fieldCheck(this.password);
    this.cPasswordInvalid = this.fieldCheck(this.cPassword);
    if (this.password.value !== this.cPassword.value) {
      this.dataValid = false;
      this.errorDispayer('noteq');
    }
    if (this.dataValid) {
      const user = {
        Login: this.login.value,
        Password: this.password.value,
      };
      const acc = this;
      const che = this.regUser.postData(user);
      che.subscribe({
        error(err) {
          acc.errorDispayer(acc.errorUser.errorHandler(err));
        },
        complete() {
          acc.formvisible = true;
        },
      });
    }
  }
}
