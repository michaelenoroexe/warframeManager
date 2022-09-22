import { Component, OnInit } from '@angular/core';
import { LoginUserService } from './login-user.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../Shared/error-handler.service'
import { LogErrorsService } from './log-errors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginUserService],
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({});
  loginInvalid?: boolean = false;
  passwordInvalid: boolean = false;
  errorHandler: boolean = true;
  errorMessage: string = '';
  dataValid: boolean = true;
  tokenKey = "accessToken";
  errorUser:LogErrorsService = new LogErrorsService();

  constructor(private logUser: LoginUserService, private router:Router) { }
  // Initialisation of login in system
  ngOnInit(): void {
    const valid =[Validators.required, Validators.minLength(4), Validators.maxLength(32),]
    this.form = new UntypedFormGroup ({
      login: new UntypedFormControl(null, valid),
      password: new UntypedFormControl(null, valid) 
    })
  }
  // Validation of fields 
  logValCh(){ this.loginInvalid = ErrorHandlerService.FieldCheck(this, this.form.get("login")) }
  passValCh(){ this.passwordInvalid = ErrorHandlerService.FieldCheck(this, this.form.get("password")) }

  // Handles form submit button
  userSignInClick() {
    this.form.disable();
    const th = this;
    const che = this.logUser.PostData(this.form.value);
    che.subscribe({
      next(value:any) {
        localStorage.setItem(th.tokenKey, value["successMessage"]);
        th.router.navigate(['/arsenal/crafting']);
      },
      error(err) {
        ErrorHandlerService.ErrorDispay(th, th.errorUser.errorHandler(err));
        th.form.enable();
      },
      complete() {
//        acc.formvisible = true;
        th.form.enable();
      },
    });
  }
}
