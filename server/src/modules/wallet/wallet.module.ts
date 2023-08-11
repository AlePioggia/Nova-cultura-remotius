import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { WalletsRepository } from 'src/repositories/wallets.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Wallet.name, schema: WalletSchema },
        ]),
    ],
    controllers: [WalletController],
    providers: [WalletService, WalletsRepository],
})
export class WalletModule {}
