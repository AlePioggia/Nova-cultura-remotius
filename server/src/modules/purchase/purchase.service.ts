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
                teacherMail: dto.teacherMail,
            });
        } catch (error) {
            throw error;
        }
    }

    async getStudentPurchases(token: any) {
        try {
            return await this.purchasesRepository.find({
                studentMail: token.mail,
            });
        } catch (error) {
            throw error;
        }
    }

    async getTeacherPurchases(token: any) {
        try {
            return await this.purchasesRepository.find({
                teacherMail: token.mail,
            });
        } catch (error) {
            throw error;
        }
    }
}
