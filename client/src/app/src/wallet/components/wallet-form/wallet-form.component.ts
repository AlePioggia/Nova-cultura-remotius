import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { IWallet, Wallet } from 'src/app/interfaces/wallet.interface';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css'],
})
export class WalletFormComponent implements OnInit {
  wallet: IWallet = new Wallet();

  constructor(
    private walletService: WalletService,
    private purchaseService: PurchaseService
  ) {}

  async ngOnInit(): Promise<void> {
    this.wallet = await this.walletService.getWallet();
  }

  async deposit(amount: number) {
    await this.walletService.deposit(amount);
    await this.purchaseService.deposit(amount);
    this.wallet = await this.walletService.getWallet();
  }

  async withdraw(amount: number) {
    if (this.wallet.balance >= amount) {
      await this.walletService.withdraw(amount);
      await this.purchaseService.withdraw(amount);
      this.wallet = await this.walletService.getWallet();
    } else {
      alert('Fondi insufficienti');
    }
  }
}
