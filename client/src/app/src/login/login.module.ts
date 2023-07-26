import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { DxButtonModule, DxFormModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { RegistrationComponent } from './components/registration/registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DxFormModule,
    DxButtonModule,
    DxTextBoxModule,
    DxSelectBoxModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
