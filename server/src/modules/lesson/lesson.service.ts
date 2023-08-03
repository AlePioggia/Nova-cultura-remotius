import { LessonsRepository } from 'src/repositories/lessons.repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LessonDto } from 'src/dto/lesson.dto';

@Injectable()
export class LessonService {
    constructor(private readonly lessonsRepository: LessonsRepository) {}

    async getLessonById(lessonId: string) {
        return await this.lessonsRepository.findOne({ id: lessonId });
    }

    async getLessons() {
        return this.lessonsRepository.find({});
    }

    async createLesson(dto: LessonDto) {
        try {
            await this.lessonsRepository.create({
                id: uuidv4(),
                teacherMail: dto.teacherMail,
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

    async getLessonsByTeacherMail(teacherMail: string) {
        try {
            return (await this.lessonsRepository.find({})).filter(
                (x) => x.teacherMail === teacherMail,
            );
        } catch (error) {
            throw error;
        }
    }
}
