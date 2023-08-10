import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { InsertPopupComponent } from './components/insert-popup/insert-popup.component';
import {
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
} from 'devextreme-angular';
import { HomepageModule } from '../homepage/homepage.module';

@NgModule({
  declarations: [InsertPopupComponent],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    DxPopupModule,
    DxFormModule,
    DxButtonModule,
    HomepageModule,
  ],
  exports: [InsertPopupComponent],
})
export class ReviewModule {}
