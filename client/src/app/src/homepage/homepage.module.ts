import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import {
  DxButtonModule,
  DxDrawerModule,
  DxFormModule,
  DxGalleryModule,
  DxListModule,
  DxPopupModule,
  DxScrollViewComponent,
  DxScrollViewModule,
  DxTextAreaModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  declarations: [HomepageComponent, CardComponent, SearchComponent],
  imports: [
    CommonModule,
    DxFormModule,
    DxToolbarModule,
    DxButtonModule,
    DxDrawerModule,
    DxScrollViewModule,
    DxListModule,
    DxGalleryModule,
    HomepageRoutingModule,
    DxPopupModule,
    DxTextAreaModule,
  ],
  exports: [HomepageComponent, CardComponent, SearchComponent],
})
export class HomepageModule {}
