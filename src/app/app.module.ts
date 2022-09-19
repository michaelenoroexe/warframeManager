import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentification/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './Authentification/register/register.component';
import { UserinfoComponent } from './navbar/userinfo/userinfo.component';
import { MenuComponent } from './navbar/menu/menu.component';
import { ResTableComponent } from './sections/resources/table/table.component';
import { ResTableItemComponent } from './sections/resources/table/res-table-item/res-table-item.component';
import { LocationComponent } from './sections/resources/location/location.component';
import { ItemdisComponent } from './sections/resources/location/itemdis/itemdis.component';
import { ArsTableComponent } from './sections/arsenal/table/arstable.component';
import { ArsTableItemComponent } from './sections/arsenal/table/arsres-table-item/arsres-table-item.component';
import { CraftingTableComponent } from './sections/arsenal/crafting-table/crafting-table.component';
import { CraftItemComponent } from './sections/arsenal/crafting-table/craft-item/craft-item.component';
import { ErrorDisplayBoxComponent } from './error-display-box/error-display-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    UserinfoComponent,
    MenuComponent,
    ResTableComponent,
    ResTableItemComponent,
    LocationComponent,
    ItemdisComponent,
    ArsTableComponent,
    ArsTableItemComponent,
    CraftingTableComponent,
    CraftItemComponent,
    ErrorDisplayBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
