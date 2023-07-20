import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export interface IAuthDto {
  email: string;
  password: string;
}

export class Auth implements IAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
