import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';
import { IsStrongPassword } from 'class-validator';

export interface IUserDto {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  password: string;
}

export class UserDto implements IUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
