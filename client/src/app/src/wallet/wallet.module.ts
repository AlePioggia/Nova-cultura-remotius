import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxNumberBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { DxiToolbarItemModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [WalletFormComponent, ReservationsComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    DxButtonModule,
    DxNumberBoxModule,
    DxDataGridModule,
    DxToolbarModule,
    DxiToolbarItemModule,
  ],
})
export class WalletModule {}
