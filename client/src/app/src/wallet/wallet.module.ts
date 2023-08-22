import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxNumberBoxModule,
} from 'devextreme-angular';
import { ReservationsComponent } from './components/reservations/reservations.component';

@NgModule({
  declarations: [WalletFormComponent, ReservationsComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    DxButtonModule,
    DxNumberBoxModule,
    DxDataGridModule,
  ],
})
export class WalletModule {}
