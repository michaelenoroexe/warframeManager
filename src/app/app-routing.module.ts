import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentification/login/login.component';
import { RegisterComponent } from './Authentification/register/register.component';
import { CraftingTableComponent } from './sections/arsenal/crafting-table/crafting-table.component';
import { ArsTableComponent } from './sections/arsenal/table/arstable.component';
import { ItemdisComponent } from './sections/resources/location/itemdis/itemdis.component';
import { LocationComponent } from './sections/resources/location/location.component';
import { ResTableComponent } from './sections/resources/table/table.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path: 'registration', component: RegisterComponent},
  {path: 'arsenal/arstable', component: ArsTableComponent},
  {path: 'arsenal/crafting', component: CraftingTableComponent},
  {path: 'resources/table', component: ResTableComponent},
  {path: 'resources/location', component: LocationComponent},
  {path: 'resources/location/:id', component: ItemdisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
