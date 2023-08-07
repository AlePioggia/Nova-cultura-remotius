import { LessonDocument } from '../schemas/lesson.schema';
import { Injectable } from '@nestjs/common';
import { Lesson } from 'src/schemas/lesson.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class LessonsRepository {
    constructor(
        @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    ) {}

    async findOne(lessonFilterQuery: FilterQuery<Lesson>): Promise<Lesson> {
        return this.lessonModel.findOne(lessonFilterQuery);
    }

    async find(lessonFilterQuery: FilterQuery<Lesson>): Promise<Lesson[]> {
        return this.lessonModel.find(lessonFilterQuery);
    }

    async create(lesson: Lesson): Promise<Lesson> {
        const createdUser = new this.lessonModel(lesson);
        return createdUser.save();
    }

    async findOneAndUpdate(
        lessonFilterQuery: FilterQuery<Lesson>,
        lesson: Partial<Lesson>,
    ) {
        return this.lessonModel.findOneAndUpdate(lessonFilterQuery, lesson);
    }

    async deleteOne(filter: any): Promise<any> {
        return this.lessonModel.deleteOne(filter);
    }
}
