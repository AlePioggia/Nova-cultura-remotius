import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { IWallet, Wallet } from 'src/app/interfaces/wallet.interface';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css'],
})
export class WalletFormComponent implements OnInit {
  // balance: number = 100;
  // amount: number = 0;
  wallet: IWallet = new Wallet();

  constructor(private walletService: WalletService) {}

  async ngOnInit(): Promise<void> {
    this.wallet = await this.walletService.getWallet();
  }

  async deposit(amount: number) {
    await this.walletService.deposit(amount);
    this.wallet = await this.walletService.getWallet();
  }

  async withdraw(amount: number) {
    if (this.wallet.balance >= amount) {
      await this.walletService.withdraw(amount);
      this.wallet = await this.walletService.getWallet();
    } else {
      alert('Fondi insufficienti');
    }
  }
}
