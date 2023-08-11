import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDTO } from 'src/dto/wallet.dto';
import { WalletsRepository } from 'src/repositories/wallets.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WalletService {
    constructor(private readonly walletsRepository: WalletsRepository) {}

    async getWalletByMail(mail: string) {
        return this.walletsRepository.findOne({ mail });
    }

    async createWallet(mail: string) {
        return this.walletsRepository.create({
            id: uuidv4(),
            mail: mail,
            balance: 0,
        });
    }

    async deposit(mail: string, amount: number) {
        const wallet = await this.getWalletByMail(mail);
        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }
        wallet.balance += amount;
        return this.walletsRepository.findOneAndUpdate({ mail }, wallet);
    }

    async withdraw(mail: string, amount: number) {
        const wallet = await this.getWalletByMail(mail);
        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }
        if (wallet.balance < amount) {
            throw new Error('Insufficient funds');
        }
        wallet.balance -= amount;
        return this.walletsRepository.findOneAndUpdate({ mail }, wallet);
    }
}
