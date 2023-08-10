import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { InsertPopupComponent } from './components/insert-popup/insert-popup.component';
import {
  DxButtonModule,
  DxFormModule,
  DxListModule,
  DxPopupModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { HomepageModule } from '../homepage/homepage.module';
import { ReviewListComponent } from './components/review-list/review-list.component';

@NgModule({
  declarations: [InsertPopupComponent, ReviewListComponent],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    DxPopupModule,
    DxFormModule,
    DxButtonModule,
    HomepageModule,
    DxListModule,
    DxTextBoxModule,
  ],
  exports: [InsertPopupComponent],
})
export class ReviewModule {}
