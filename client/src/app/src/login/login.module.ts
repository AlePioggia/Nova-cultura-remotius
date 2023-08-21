import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import {
  DxButtonModule,
  DxFormModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToastModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DxFormModule,
    DxButtonModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxNumberBoxModule,
    DxToastModule,
  ],
  exports: [LoginComponent, RegistrationComponent],
})
export class LoginModule {}
