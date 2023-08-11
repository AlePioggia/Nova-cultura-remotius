import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';

@Injectable()
export class WalletsRepository {
    constructor(
        @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    ) {}

    async findOne(walletFilterQuery: FilterQuery<Wallet>): Promise<Wallet> {
        return this.walletModel.findOne(walletFilterQuery);
    }

    async find(walletsFilterQuery: FilterQuery<Wallet>): Promise<Wallet[]> {
        return this.walletModel.find(walletsFilterQuery);
    }

    async create(wallet: Wallet): Promise<Wallet> {
        const createdWallet = new this.walletModel(wallet);
        return createdWallet.save();
    }

    async findOneAndUpdate(
        walletFilterQuery: FilterQuery<Wallet>,
        wallet: Partial<Wallet>,
    ) {
        return this.walletModel.findOneAndUpdate(walletFilterQuery, wallet);
    }
}
