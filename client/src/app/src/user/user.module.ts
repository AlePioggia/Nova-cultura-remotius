import {
  DxButtonModule,
  DxFormModule,
  DxGalleryModule,
} from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    DxFormModule,
    DxGalleryModule,
    DxButtonModule,
  ],
})
export class UserModule {}
