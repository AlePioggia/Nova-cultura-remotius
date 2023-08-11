import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export interface ICreatePurchaseDTO {
    id: string;
    studentMail: string;
    amount: number;
}

export class CreatePurchaseDTO implements ICreatePurchaseDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    studentMail: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
