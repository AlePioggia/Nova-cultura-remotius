import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface ILessonDto {
    startTime: Date;
    endTime: Date;
    subject: string;
    notes: string;
}

export class LessonDto implements ILessonDto {
    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    notes: string;
}
