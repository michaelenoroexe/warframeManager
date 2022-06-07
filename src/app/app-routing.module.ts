import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentification/login/login.component';
import { RegisterComponent } from './Authentification/register/register.component';
import { ResTableComponent } from './sections/resources/table/table.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path: 'registration', component: RegisterComponent},
  {path: 'resources/table', component: ResTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
