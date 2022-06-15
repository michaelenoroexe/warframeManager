import { Component, OnInit } from '@angular/core';
import { LoginUserService } from './login-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../Shared/error-handler.service'
import { LogErrorsService } from './log-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginUserService],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loginInvalid?: boolean = false;
  passwordInvalid: boolean = false;
  errorHandler: boolean = true;
  errorMessage: string = '';
  dataValid: boolean = true;
  tokenKey = "accessToken";
  errorUser:LogErrorsService = new LogErrorsService();

  constructor(private logUser: LoginUserService) { }
  // Initialisation of login in system
  ngOnInit(): void {
    const valid =[Validators.required, Validators.minLength(4), Validators.maxLength(32),]
    this.form = new FormGroup ({
      login: new FormControl(null, valid),
      password: new FormControl(null, valid) 
    })
  }
  // Validation of fields 
  logValCh(){ this.loginInvalid = ErrorHandlerService.FieldCheck(this, this.form.get("login")) }
  passValCh(){ this.passwordInvalid = ErrorHandlerService.FieldCheck(this, this.form.get("password")) }

  // Handles form submit button
  userSignInClick() {
    this.form.disable();
    const acc = this;
    const che = this.logUser.PostData(this.form.value);
    che.subscribe({
      next(value:any) {
        localStorage.setItem(acc.tokenKey, value["successMessage"])
        console.log(value["successMessage"]);
      },
      error(err) {
        ErrorHandlerService.ErrorDispay(acc, acc.errorUser.errorHandler(err));
        acc.form.enable();
      },
      complete() {
//        acc.formvisible = true;
        acc.form.enable();
      },
    });
  }
}
