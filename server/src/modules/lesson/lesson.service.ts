import { LessonsRepository } from 'src/repositories/lessons.repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ILessonRequestDto, LessonDto } from 'src/dto/lesson.dto';

@Injectable()
export class LessonService {
    constructor(private readonly lessonsRepository: LessonsRepository) {}

    async getLessonById(lessonId: string) {
        return await this.lessonsRepository.findOne({ id: lessonId });
    }

    async getLessons() {
        return await this.lessonsRepository.find({});
    }

    async createLesson(dto: LessonDto, token: any) {
        try {
            await this.lessonsRepository.create({
                id: uuidv4(),
                teacherMail: token?.mail ?? '',
                studentMail: '',
                startTime: dto.startTime,
                endTime: dto.endTime,
                subject: dto.subject,
                notes: dto.notes,
            });
        } catch (error) {
            throw error;
        }
    }

    async getLessonsForLoggedInUser(token: any) {
        try {
            return await this.lessonsRepository.find({
                studentMail: token?.mail ?? '',
            });
        } catch (error) {
            throw error;
        }
    }

    async getLessonsByTeacherMail(
        teacherMail: string,
        excludeStudent: boolean = false,
    ) {
        try {
            if (excludeStudent)
                return (await this.lessonsRepository.find({})).filter(
                    (x) =>
                        x.teacherMail === teacherMail && x.studentMail === '',
                );
            else
                return (await this.lessonsRepository.find({})).filter(
                    (x) => x.teacherMail === teacherMail,
                );
        } catch (error) {
            throw error;
        }
    }

    async patchLesson(lessonId: string, dto: ILessonRequestDto) {
        try {
            return await this.lessonsRepository.findOneAndUpdate(
                { id: lessonId },
                dto,
            );
        } catch (error) {
            throw error;
        }
    }

    async bookLesson(lessonId: string, studentMail: string) {
        try {
            return await this.lessonsRepository.findOneAndUpdate(
                { id: lessonId },
                { studentMail: studentMail },
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteLesson(lessonId: string) {
        try {
            await this.lessonsRepository.deleteOne({ id: lessonId });
        } catch (error) {
            throw error;
        }
    }
}
