import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentification/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './Authentification/register/register.component';
import { UserinfoComponent } from './navbar/userinfo/userinfo.component';
import { MenuComponent } from './navbar/menu/menu.component';
import { ResTableComponent } from './sections/resources/table/table.component';
import { ResTableItemComponent } from './sections/resources/table/res-table-item/res-table-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    UserinfoComponent,
    MenuComponent,
    ResTableComponent,
    ResTableItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
