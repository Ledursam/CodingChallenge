import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
