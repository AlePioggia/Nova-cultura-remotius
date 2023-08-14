import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export interface ICreatePurchaseDTO {
    operationId: number;
    amount: number;
    lessonId: number;
}

export class CreatePurchaseDTO implements ICreatePurchaseDTO {
    @IsNotEmpty()
    @IsNumber()
    operationId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    lessonId: number;
}
