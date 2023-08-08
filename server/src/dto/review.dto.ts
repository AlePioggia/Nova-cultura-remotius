import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    Min,
    Max,
} from 'class-validator';

export interface ICreateReviewDto {
    teacherMail: string;
    studentMail: string;
    vote: number;
    description: string;
}

export class CreateReviewDto implements ICreateReviewDto {
    @IsNotEmpty()
    @IsEmail()
    readonly teacherMail: string;

    @IsOptional()
    @IsEmail()
    readonly studentMail: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    readonly vote: number;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
