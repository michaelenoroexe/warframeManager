import { Component, OnInit } from '@angular/core';
import { LoginUserService } from './login-user.service';
import { FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../Shared/error-handler.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginUserService],
})
export class LoginComponent implements OnInit {
  valid:any =[Validators.required, Validators.minLength(4), Validators.maxLength(32),]
  login: FormControl = new FormControl('', this.valid);
  password: FormControl = new FormControl('', this.valid);
  loginInvalid: boolean = false;
  passwordInvalid: boolean = false;
  errorHandler: boolean = false;
  errorMessage: string = '';
  dataValid: boolean = false;
//  errorUser:RegErrorsService = new RegErrorsService();
  constructor(private logUser: LoginUserService) { }

  ngOnInit(): void {
  }
  
  userSignInClick() {
    this.dataValid = true;
    this.errorHandler = false;
    this.loginInvalid = ErrorHandlerService.FieldCheck(this, this.login);
    this.passwordInvalid = ErrorHandlerService.FieldCheck(this, this.password);
    if (this.dataValid) {
      const user = {
        Login: this.login.value,
        Password: this.password.value,
      };
      const acc = this;
      const che = this.logUser.PostData(user);
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
