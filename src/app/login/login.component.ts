import { Component, OnInit } from '@angular/core';
import { LoginUserService } from './login-user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginUserService],
})
export class LoginComponent implements OnInit {
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
  loginInvalid: boolean = false;
  passwordInvalid: boolean = false;
  errorHandler: boolean = false;
  errorMessage: string = '';
  dataValid: boolean = false;
//  errorUser:RegErrorsService = new RegErrorsService();
  constructor(private logUser: LoginUserService) { }

  ngOnInit(): void {
  }
  errorDispayer(err: string) {
    if (err === 'required') this.errorMessage = 'Required field is missing';
    if (err === 'minlength') this.errorMessage = 'Minimal lenght of fields is 4';
    if (err === 'maxlength') this.errorMessage = 'Maximal lenght of fields is 15';
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
  
  userSignInClick() {
    this.dataValid = true;
    this.errorHandler = false;
    this.loginInvalid = this.fieldCheck(this.login);
    this.passwordInvalid = this.fieldCheck(this.password);
    if (this.dataValid) {
      const user = {
        Login: this.login.value,
        Password: this.password.value,
      };
      const acc = this;
      const che = this.logUser.postData(user);
      che.subscribe({
        error(err) {
//          acc.errorDispayer(acc.errorUser.errorHandler(err));
        },
        complete() {
//          acc.formvisible = true;
        },
      });
    }
  }
}
