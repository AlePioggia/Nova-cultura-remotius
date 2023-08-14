import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Module } from '@nestjs/common';
import { Purchase, PurchaseSchema } from 'src/schemas/purchase.schema';
import { PurchasesRepository } from 'src/repositories/purchases.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Purchase.name, schema: PurchaseSchema },
        ]),
    ],
    controllers: [PurchaseController],
    providers: [PurchaseService, PurchasesRepository],
})
export class PurchaseModule {}
