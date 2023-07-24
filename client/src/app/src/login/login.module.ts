import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { DxButtonModule, DxFormModule, DxTextBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DxFormModule,
    DxButtonModule,
    DxTextBoxModule,
    DxTextBoxModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
