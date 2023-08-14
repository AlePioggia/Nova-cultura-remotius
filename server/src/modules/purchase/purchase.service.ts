import { Injectable } from '@nestjs/common';
import { CreatePurchaseDTO } from 'src/dto/purchase.dto';
import { PurchasesRepository } from 'src/repositories/purchases.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PurchaseService {
    constructor(private readonly purchasesRepository: PurchasesRepository) {}

    async createPurchase(dto: CreatePurchaseDTO, token: any) {
        try {
            await this.purchasesRepository.create({
                id: uuidv4(),
                studentMail: token?.mail ?? '',
                operationId: dto.operationId,
                amount: dto.amount,
                lessonId: dto.lessonId,
            });
        } catch (error) {
            throw error;
        }
    }

    async getPurchases(token: any) {
        try {
            await this.purchasesRepository.find({ mail: token.mail });
        } catch (error) {
            throw error;
        }
    }
}
