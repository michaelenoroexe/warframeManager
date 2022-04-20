import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {RegUserService} from '../reg-user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  login: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(15),
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(15),
  ]);
  cPassword: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(15)
  ]);
  loginInvalid: boolean = false;
  passwordInvalid: boolean = false; 
  cPasswordInvalid: boolean = false;
  dataValid: boolean = false;
  errorHandler: boolean = false;
  errorMessage: string = '';

  constructor(private regUser: RegUserService) {
  }

  ngOnInit(): void {}
  errorDispayer(err: string) {
    if (err === 'required') this.errorMessage = 'Required field is missing';
    if (err === 'minlength') this.errorMessage = 'Minimal lenght of fields is 4';
    if (err === 'maxlength') this.errorMessage = 'Maximal lenght of fields is 15';
    if (err === 'noteq') this.errorMessage =     'Control password is incorrect';
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
      this.errorDispayer("noteq");
    }

    if (this.dataValid) {
      const user = {
        login: this.login.value,
        password: this.password.value
      }
      this.regUser.postData(user);
    }

  }
}
