import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';
import { DxButtonModule, DxNumberBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [WalletFormComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    DxButtonModule,
    DxNumberBoxModule,
  ],
})
export class WalletModule {}
