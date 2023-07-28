import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface ILessonDto {
    teacherMail: string;
    studentMail: string;
    startTime: Date;
    endTime: Date;
    subject: string;
    notes: string;
}

export class LessonDto implements ILessonDto {
    @IsEmail()
    @IsNotEmpty()
    teacherMail: string;

    studentMail: string;

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
