import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DxButtonModule, DxDrawerModule, DxFormModule, DxListModule, DxScrollViewComponent, DxScrollViewModule, DxToolbarModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    DxFormModule,
    DxToolbarModule,
    DxButtonModule,
    DxDrawerModule,
    DxScrollViewModule,
    DxListModule
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule { }
