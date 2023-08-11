import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Purchase, PurchaseDocument } from 'src/schemas/purchase.schema';

@Injectable()
export class PurchasesRepository {
    constructor(
        @InjectModel(Purchase.name)
        private purchaseModel: Model<PurchaseDocument>,
    ) {}

    async findOne(
        purchaseFilterQuery: FilterQuery<Purchase>,
    ): Promise<Purchase> {
        return this.purchaseModel.findOne(purchaseFilterQuery);
    }

    async find(
        purchasesFilterQuery: FilterQuery<Purchase>,
    ): Promise<Purchase[]> {
        return this.purchaseModel.find(purchasesFilterQuery);
    }

    async create(purchase: Purchase): Promise<Purchase> {
        const createdPurchase = new this.purchaseModel(purchase);
        return createdPurchase.save();
    }

    async findOneAndUpdate(
        purchaseFilterQuery: FilterQuery<Purchase>,
        purchase: Partial<Purchase>,
    ) {
        return this.purchaseModel.findOneAndUpdate(
            purchaseFilterQuery,
            purchase,
        );
    }
}
