import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";

export interface IAuth {
    email: string;
    password: string;
}

export class Auth implements IAuth {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}