import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SecurityComponent} from './security.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouteUri} from '../utils/vars';

const routeUri = new RouteUri();
const routes: Routes = [
  {
    path: routeUri.SECURITY.RACINE.NAME, component: SecurityComponent,
    children: [
      { path: routeUri.SECURITY.LOGIN.NAME, component: LoginComponent },
      { path: routeUri.SECURITY.REGISTER.NAME, component: RegisterComponent },
      { path: '', redirectTo: routeUri.SECURITY.LOGIN.NAME, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }