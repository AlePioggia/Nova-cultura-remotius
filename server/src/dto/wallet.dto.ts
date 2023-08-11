import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export interface ICreateWalletDTO {
    id: string;
    mail: string;
    balance: string;
}

export class CreateWalletDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    @IsNumber()
    balance: number;
}
