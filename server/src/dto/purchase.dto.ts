import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export interface ICreatePurchaseDTO {
    operationId: number;
    amount: number;
    lessonId: number;
    teacherMail: string;
}

export class CreatePurchaseDTO implements ICreatePurchaseDTO {
    @IsNotEmpty()
    @IsNumber()
    operationId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    lessonId: number;

    @IsNotEmpty()
    @IsEmail()
    teacherMail: string;
}
