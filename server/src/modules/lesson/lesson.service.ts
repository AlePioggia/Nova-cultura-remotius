import { LessonsRepository } from 'src/repositories/lessons.repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LessonService {
    constructor(private readonly lessonsRepository: LessonsRepository) {}

    async getLessonById(lessonId: string) {
        return await this.lessonsRepository.findOne({ id: lessonId });
    }

    async getLessons() {
        return this.lessonsRepository.find({});
    }

    async createLesson(
        startTime: Date,
        endTime: Date,
        subject: string,
        notes: string,
    ) {
        try {
            await this.lessonsRepository.create({
                id: uuidv4(),
                teacherMail: 'alexpioggia@gmail.com',
                studentMail: '',
                startTime: startTime,
                endTime: endTime,
                subject: subject,
                notes: notes,
            });
        } catch (error) {
            throw error;
        }
    }
}
